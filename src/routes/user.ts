import { Router } from "express";
import { uploadImage } from "../lib/upload-image";
import { protectUserRoute } from "../middleware/user.middleware";
import { uploadProfilePicture } from "../controllers/user.controller";

const router = Router();

router.post("/profile", protectUserRoute, uploadImage.single("profilePicture"), uploadProfilePicture);

export { router as userRouter };
