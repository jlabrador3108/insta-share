import express, { Application } from "express";
import { routes } from "./routes";
import multer from "multer";
import path from "path";
import { createServer } from "http";
import cors from "cors";
import { createClient } from 'redis';

class Server {
  private app: Application;
  private port: string;
  private server: any;

  constructor() {
    this.app = express();

    this.port = process.env.PORT || "4000";

    this.server = createServer(this.app);

    this.middlewares();

    const client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
    
    client.on("connect", () => {
      console.log("Redis connected");
    });
    
    client.on("error", (err) => {
      console.log(`Error connecting to Redis: ${err}`);
    });

    routes(this.app);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(cors());
    // MULTER STORAGE
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    this.app.use(upload.single("file"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

export default Server;
