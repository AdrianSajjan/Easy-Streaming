import { Router } from "express";
import { protectUserRoute } from "../middleware/jwt.middleware";
import { createStreamKey, publishLiveStream, stopLiveStream } from "../controllers/stream.controller";
import { validate } from "../middleware/validation.middleware";
import { streamChain } from "../validations/validate-live-stream";
import { uploadVideo } from "../lib/video-upload";

const router = Router();

const upload = uploadVideo.single("thumbnail");

router
  .get("/key", protectUserRoute, createStreamKey)
  .get("/:key/stop", protectUserRoute, stopLiveStream)
  .post("/", protectUserRoute, upload, validate(streamChain), publishLiveStream);

export { router as streamRouter };
