import express, { Express, Response, Request } from "express";
import { createHealthRouter } from "./routes/health";
import { createServer as createHttpServer } from "http";
import { socketHandler } from "./sockets/socketHandler";
import { Server } from "socket.io";
// import { sendNotification } from "./util/sendNotification";
import { cleanUpStorage } from "./dataLayer/storageOperations";
// import {getData} from "./dataLayer/storageOperations";
import cors from "cors";

const errorHandler = (error: Error, req: Request, res: Response) => {
  console.log(error);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let httpServer: ReturnType<typeof createHttpServer> | null = null;

export const createServer = (): ReturnType<typeof createHttpServer> => {
  if (httpServer) return httpServer;

  const app: Express = express();
  httpServer = createHttpServer(app); // Create an HTTP server from Express

  app.use(cors());
  app.use(
    cors({
      origin: "http://localhost:5173", // Allow only frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/v1", createHealthRouter());

  app.use((req, res, next) => {
    next(new Error("Not found"));
  });

  app.use(errorHandler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  socketHandler(io);

  // setInterval(() => {
  //   console.log("Sending a periodic notification...");
  //   sendNotification(getData());
  // }, 10000);

  setInterval(() => {
    cleanUpStorage();
  }, 2000);

  return httpServer;
};
