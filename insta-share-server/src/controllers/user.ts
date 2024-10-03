import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { redisClient } from "..";
const prisma = new PrismaClient();

export const registerUser = async (req: any, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      return res.status(404).json({
        message: "No username provided",
      });
    }

    if (!password) {
      return res.status(404).json({
        message: "No password provided",
      });
    }
    const existingUser = await prisma.user.findFirst({ where: { username } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    res.status(201).json(user);
    setValue("user_" + user.username, user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: any, res: Response) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      return res.status(404).json({
        message: "No username provided",
      });
    }

    if (!password) {
      return res.status(404).json({
        message: "No password provided",
      });
    }
    let user = await getValue("user_" + username);

    if (!user) user = await prisma.user.findFirst({ where: { username } });

    if (!user || password !== user.password) {
      return res.status(401).send("Invalid credentials");
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const generateToken = (user) => {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "1d",
  });
};

async function setValue(key: string, value: any): Promise<string> {
  try {
    const result = await redisClient.set(key, JSON.stringify(value));
    return result;
  } catch (error) {
    console.error("Error setting value:", error);
    throw error;
  }
}

async function getValue(key: string): Promise<any> {
  try {
    const result = await redisClient.get(key);
    if (result) {
      return JSON.parse(result);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting value:", error);
    return null;
  }
}
