const cors = require("cors");
const users = require("./routes/users");
const projects = require("./routes/projects");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/projects", projects);

let rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("create_room", (data) => {
    const { roomId, userId, username } = data;
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {}, code: "", messages: [] };
    }
    rooms[roomId].users[socket.id] = { userId, username };
    console.log(`Room created: ${roomId}`);
    socket.emit("room_created", roomId);
    io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
  });

  socket.on("join_room", (data) => {
    const { roomId, userId, username } = data;
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {}, code: "", messages: [] };
    }
    rooms[roomId].users[socket.id] = { userId, username };
    console.log(`Room joined: ${roomId}`);
    socket.emit("room_joined", roomId);

    socket.emit("code_update", rooms[roomId].code);
    socket.emit("chat_history", rooms[roomId].messages);
    io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
  });

  socket.on("code_change", ({ room, code }) => {
    if (rooms[room]) {
      console.log(`Code change in room ${room}: ${code}`);
      rooms[room].code = code;
      io.to(room).emit("code_update", code);
    }
  });

  socket.on("send_message", ({ roomId, username, text }) => {
    if (rooms[roomId]) {
      const message = { username, text, timestamp: new Date() };
      rooms[roomId].messages.push(message);
      console.log(`Message sent in room ${roomId}: ${text}`);
      io.to(roomId).emit("message", message);
    }
  });

  socket.on("ban_user", ({ roomId, userIdToBan }) => {
    const socketIdToBan = Object.keys(rooms[roomId].users).find(
      (id) => rooms[roomId].users[id].userId === userIdToBan
    );
    if (socketIdToBan) {
      console.log(rooms[roomId].users);
      io.sockets.sockets.get(socketIdToBan).emit("banned");
      io.sockets.sockets.get(socketIdToBan).disconnect();
      delete rooms[roomId].users[socketIdToBan];
      io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
    }
  });

  socket.on("end_session", ({ roomId }) => {
    if (rooms[roomId]) {
      Object.keys(rooms[roomId].users).forEach((socketId) => {
        const socketToNotify = io.sockets.sockets.get(socketId);
        if (socketToNotify) {
          socketToNotify.emit("session_ended");
          socketToNotify.disconnect();
        } else {
          console.error(`Socket with ID ${socketId} not found`);
        }
      });
      delete rooms[roomId];
    } else {
      console.error(`Room with ID ${roomId} not found`);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
    for (const roomId in rooms) {
      if (rooms[roomId].users[socket.id]) {
        delete rooms[roomId].users[socket.id];
        io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
        break;
      }
    }
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
