import { Router } from "express";
import { uploadVideo } from "../lib/video-upload";
import { protectUserRoute } from "../middleware/user.middleware";
import { createVideoRecord } from "../controllers/upload.controller";

const router = Router();

const upload = uploadVideo.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

router.post("/", protectUserRoute, upload, createVideoRecord);
