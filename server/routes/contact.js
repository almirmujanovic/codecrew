const express = require("express");
const router = express.Router();
const pool = require("../db");
const nodemailer = require("nodemailer");

// Contact form route
router.post("/", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertContactQuery = `
        INSERT INTO contact_messages (email, message)
        VALUES ($1, $2) RETURNING *
      `;
      const contactValues = [email, message];

      const result = await client.query(insertContactQuery, contactValues);

      await client.query("COMMIT");

      const savedMessage = result.rows[0];

      // Configure your email service
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com", // replace with your email
          pass: "your-email-password",  // replace with your email password
        },
      });

      const mailOptions = {
        from: email,
        to: "info@codecrew.com", // replace with your receiving email
        subject: "Contact Form Submission",
        text: message,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({ message: "Message sent and saved successfully", savedMessage });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Transaction Error: ", err);
      res.status(500).send("Server error during transaction");
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("Connection Error: ", err);
    res.status(500).send("Server error unable to connect");
  }
});

module.exports = router;
