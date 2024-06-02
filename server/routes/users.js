const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.post("/getUsernames", async (req, res) => {
  const { userIds } = req.body;

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ message: "Invalid user IDs" });
  }

  try {
    const result = await pool.query(
      "SELECT user_id, username FROM users WHERE user_id = ANY($1)",
      [userIds]
    );
    const usernames = result.rows.map((row) => ({
      id: row.user_id,
      username: row.username,
    }));
    res.status(200).json({ usernames });
  } catch (error) {
    console.error("Error fetching usernames: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const token = jwt.sign(
      { userId: newUser.rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length > 0) {
      const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );

      if (validPassword) {
        const token = jwt.sign(
          { userId: user.rows[0].user_id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.json({
          token,
          username: user.rows[0].username,
          userId: user.rows[0].user_id,
        });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
