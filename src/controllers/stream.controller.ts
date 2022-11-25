import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { liveVideoURLBase } from "../constants/live-url";
import { handleServerError } from "../lib/server-error";
import { User } from "../schema/User";
import { Video } from "../schema/Video";

const publishLiveStream = async (req: Request, res: Response) => {
  try {
    const { title, streamKey } = req.body;
    const { path: thumbnail, mimetype } = req.file!;
    const liveVideoURL = liveVideoURLBase.replace("$streamKey", streamKey);
    const user = await User.findById(req.user.id);
    if (!user || user.activeStreamKey != streamKey) return res.status(404).json({ status: 404, message: "Invalid stream key supplied" });
    const video = await Video.create({ title, thumbnail, isLiveVideo: true, streamKey, mimetype, liveVideoURL });
    return res.json({ video });
  } catch (error) {
    handleServerError(error, res);
  }
};

const stopLiveStream = async (req: Request, res: Response) => {
  try {
    const streamKey = req.params.key;
    const video = await Video.findOneAndUpdate({ streamKey }, { $set: { isLiveVideo: false } }, { new: true });
    return res.json({ video });
  } catch (error) {
    handleServerError(error, res);
  }
};

const createStreamKey = async (req: Request, res: Response) => {
  try {
    const streamKey = nanoid(12);
    await User.findByIdAndUpdate(req.user.id, { $set: { activeStreamKey: streamKey } });
    return res.json({ streamKey });
  } catch (error) {
    handleServerError(error, res);
  }
};

export { createStreamKey, publishLiveStream, stopLiveStream };
