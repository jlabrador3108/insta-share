import { Router } from "express";
import { getFiles, updateFile, uploadFile } from "../controllers/file";
import { verifyAccess } from "../middlewares/security";

const fileRouter = Router();

fileRouter.post(
  "/",
  verifyAccess,
  uploadFile
);

fileRouter.get(
  "/",
  verifyAccess,
  getFiles
);

fileRouter.patch(
  "/:id",
  updateFile
);



export default fileRouter;
