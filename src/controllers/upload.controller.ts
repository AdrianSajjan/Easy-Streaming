import { Request, Response } from "express";
import { handleServerError } from "../lib/server-error";
import { Video } from "../schema/Video";

const createVideoRecord = async (req: Request, res: Response) => {
  try {
    const files = req.files as Record<"thumbnail" | "video", Express.Multer.File[]>;

    const thumbnail = files.thumbnail[0].path;
    const videoURL = files.video[0].path;
    const mimetype = files.video[0].mimetype;

    const id = req.user.id;
    const { title, description } = req.body;
    const video = await Video.create({ title, description, videoURL: videoURL, mimetype, thumbnail, postedBy: id });
    return res.json({ video });
  } catch (error) {
    handleServerError(error, res);
  }
};

export { createVideoRecord };
