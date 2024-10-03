import { Application, Router } from "express";
import userRouter from "./user";
import fileRouter from "./file";

const routers: Record<string, Router> = {
  user: userRouter,
  file: fileRouter
};

export const routes = (app: Application) => {
  app.get('/', (req, res) => {
    res.send('Hello word!');
  });
  for (const [route, controller] of Object.entries(routers)) {
    app.use(`/${route}`,
      controller);
  }
};
