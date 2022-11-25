import { Request, Response } from "express";
import { handleServerError } from "../lib/server-error";
import { Video } from "../schema/Video";

const createVideoRecord = async (req: Request, res: Response) => {
  try {
    const files = req.files as Record<string, Express.Multer.File[]>;

    if (!files || !files.length) return res.status(400).json({ status: 401, message: "Unable to upload video." });

    const thumbnail = files.thumbnail[0].destination;
    const videoURL = files.video[0].destination;

    const id = req.user.id;
    const { title, description } = req.body;
    const video = await Video.create({ title, description, videoURL: videoURL, thumbnail, postedBy: id });
    return res.json({ video });
  } catch (error) {
    handleServerError(error, res);
  }
};

export { createVideoRecord };
