declare global {
  namespace Express {
    interface Request {
      user: UserPayload;
    }
  }
}

require("dotenv").config();

import http from "http";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import express from "express";
import socketio from "socket.io";

import { authRouter } from "./routes/auth";
import { serverConfig } from "./config/server";
import { mediaServer } from "./lib/media-server";
import { handleSocketIO } from "./events/socket-io";
import { UserPayload } from "./interface/authentication";
import { connectDatabase } from "./database/connect";
import { uploadRouter } from "./routes/upload";
import { userRouter } from "./routes/user";
import { watchRouter } from "./routes/watch";
import { streamRouter } from "./routes/stream";

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

app.use(cors());
app.use(express.json());
app.use(morgan("common"));
app.use("/static", express.static(path.join(__dirname, "..", "static")));

app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);
app.use("/v1/upload", uploadRouter);
app.use("/v1/watch", watchRouter);
app.use("/v1/stream", streamRouter);

app.get("/", (_, res) => res.json({ message: "Welcome to EasyStreaming API", version: serverConfig.version }));

io.on("connection", handleSocketIO);

connectDatabase
  .then(() => {
    console.log("[DB] Connection to MongoDB successful");
    mediaServer.run();
    server.listen(serverConfig.port, () => {
      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      console.log(`${date} ${time} [HTTP] EasyStreaming API has started on port ${serverConfig.port}`);
      console.log(`${date} ${time} [WS] EasyStreaming Websocket Server has started on port ${serverConfig.port}`);
    });
  })
  .catch((error) => {
    console.log("[DB] Connection to MongoDB failed");
    console.log(error);
  });
