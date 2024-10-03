import dotenv from "dotenv";
import Server from "./server";
import { createClient } from "redis";

dotenv.config();

const server = new Server();

export const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

(async () => {
  redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
  });
  redisClient.on("ready", () => console.info("Redis is ready"));
  await redisClient.connect();
  await redisClient.ping();
})();

server.listen();
