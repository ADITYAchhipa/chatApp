import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import {Server} from "socket.io"


import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import messageRouter from "./routes/messageRoutes.js";
import { connectDB } from "./lib/db.js";
import http from "http";


const app = express();
const PORT = process.env.PORT;

app.use(express.json({limit:"4mb"}))

const server = http.createServer(app); 

export const io = new Server(server,{
  cors:{origin:"*"}
})

export const userSocketMap={}

io.on("connection",(socket)=>{
  const userId = socket.handshake.query.userId;
  // console.log("userconnected",userId);

  if(userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers",Object.keys(userSocketMap));
  socket.on("disconnect",()=>{
    console.log("user disconnected",userId)
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
  })
})



app.use(
  cors({
    origin: "*",
    credentials: true, // allow frontend to send cookies
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/messages",messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

if(process.env.NODE_ENV !== "production"){

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
  });


}


export default server