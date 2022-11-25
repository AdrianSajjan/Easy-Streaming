import fs from "fs";
import { Request, Response } from "express";
import { Video } from "../schema/Video";
import { handleServerError } from "../lib/server-error";

const fetchAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find({});
    return res.json({ videos });
  } catch (error) {
    handleServerError(error, res);
  }
};

const fetchVideoByID = async (req: Request, res: Response) => {
  try {
    const video = await Video.findById(req.params.id);
    return res.json({ video });
  } catch (error) {
    handleServerError(error, res);
  }
};

const watchVideo = async (req: Request, res: Response) => {
  try {
    const range = req.headers.range;

    const id = req.params.id;
    const video = await Video.findById(id);

    if (!video || !video.videoURL)
      return res.status(404).json({ status: 404, message: "Requested video URL doesn't exist or has been deleted" });

    const path = video.videoURL;
    const videoSize = fs.statSync(path).size;

    if (range) {
      const chunkSize = 10 ** 6;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + chunkSize, videoSize - 1);
      const contentLength = end - start + 1;

      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": video.mimetype,
      };

      res.writeHead(206, headers);
      const stream = fs.createReadStream(path, { start, end });
      stream.pipe(res);
    } else {
      const headers = {
        "Content-Length": videoSize,
        "Content-Type": video.mimetype,
      };
      res.writeHead(200, headers);
      const stream = fs.createReadStream(path);
      stream.pipe(res);
    }
  } catch (error) {
    handleServerError(error, res);
  }
};

const watchLiveVideo = (req: Request, res: Response) => {};

export { watchVideo, watchLiveVideo, fetchAllVideos, fetchVideoByID };
