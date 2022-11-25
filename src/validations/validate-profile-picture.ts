import { check } from "express-validator";
import { allowedImageMimeTypes } from "../constants/mime-types";

const profilePictureChain = [
  check("profilePicture")
    .custom((_, { req }) => {
      if (!req.file || !allowedImageMimeTypes.includes(req.file.mimetype)) return false;
      return true;
    })
    .withMessage("Unable to upload profile picture. Please select a valid image."),
];

export { profilePictureChain };
