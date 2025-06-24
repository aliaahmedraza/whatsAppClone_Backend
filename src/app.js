import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import connectDB from "./dataBase/dbConfig.js";
import allRouters from "./routers/allRouters.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.emit("chat message", "Welcome to the chat!");
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
connectDB();
app.use(allRouters);
server.listen(port, () => {
  console.log(`Server is running of port ${port}`);
});
