import { Router } from "express";
import { uploadImage } from "../lib/upload-image";
import { protectUserRoute } from "../middleware/jwt.middleware";
import { uploadProfilePicture } from "../controllers/user.controller";
import { profilePictureChain } from "../validations/validate-profile-picture";
import { validate } from "../middleware/validation.middleware";

const router = Router();

const upload = uploadImage.single("profilePicture");

router.post("/profile", protectUserRoute, upload, validate(profilePictureChain), uploadProfilePicture);

export { router as userRouter };
