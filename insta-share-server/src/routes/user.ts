import { Router } from "express";
import { login, registerUser } from "../controllers/user";

const userRouter = Router();

userRouter.post(
  "/",
  registerUser
);

userRouter.post(
  "/login",
  login
);

export default userRouter;
