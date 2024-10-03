import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import AdmZip from "adm-zip";

const prisma = new PrismaClient();

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const { user } = req;

    if (!file) {
      return res.status(400).json({
        message: "No file provided.",
      });
    }

    const [name, ext] = file?.originalname?.split(".");

    const uploadDir = path.join(__dirname, "../../public");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${uuidv4()}.${ext}`;
    const zipFileName = `${uuidv4()}.zip`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    const stats = fs.statSync(filePath);

    const size = stats.size / (1024 * 1024);

    const zipUrl = process.env.SERVER_URL + "/" + zipFileName;

    const newFile = await prisma.file.create({
      data: {
        size,
        name,
        userId: +user.id,
        zipUrl,
      },
    });

    res.status(201).json(newFile);

    uploadZip({ filePath, uploadDir, zipFileName });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const uploadZip = async ({
  filePath,
  uploadDir,
  zipFileName,
}: {
  filePath: string;
  uploadDir: string;
  zipFileName: string;
}) => {
  const zip = new AdmZip();

  zip.addLocalFile(filePath);

  zip.writeZip(path.join(uploadDir, zipFileName));
};

export const getFiles = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const files = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({
      items: files,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateFile = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const uploadedFile = await prisma.file.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });
    return res.status(200).json({ item: uploadedFile });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
