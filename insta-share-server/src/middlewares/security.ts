import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const verifyAccess = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {

    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(403).send('Invalid token');
    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.user = decoded;
      next();
    });
  } catch (error: any) {
    return res.json({ message: error.message ?? "Internal server error" });
  }
};
