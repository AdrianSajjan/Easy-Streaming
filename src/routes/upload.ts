import { Router } from "express";
import { uploadVideo } from "../lib/video-upload";
import { protectUserRoute } from "../middleware/jwt.middleware";
import { createVideoRecord } from "../controllers/upload.controller";
import { validate } from "../middleware/validation.middleware";
import { uploadChain } from "../validations/validate-upload";

const router = Router();

const upload = uploadVideo.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

router.post("/", protectUserRoute, upload, validate(uploadChain), createVideoRecord);

export { router as uploadRouter };
