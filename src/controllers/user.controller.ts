import type { Request, Response } from "express";
import { nanoid } from "nanoid";

import { User } from "../schema/User";
import { handleServerError } from "../lib/server-error";

const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const id = req.user.id;
    if (!file) return res.status(400).json({ status: 400, message: "Coudn't upload file" });
    const user = await User.findByIdAndUpdate(id, { $set: { profilePicture: file.destination } });
    return res.json({ user });
  } catch (error) {
    handleServerError(error, res);
  }
};

const createStreamKey = async (req: Request, res: Response) => {
  try {
    const streamKey = nanoid(12);
    const user = await User.findByIdAndUpdate(req.user.id, { $set: { activeStreamKey: streamKey } });
    return res.json({ user, streamKey });
  } catch (error) {
    handleServerError(error, res);
  }
};

export { uploadProfilePicture, createStreamKey };
