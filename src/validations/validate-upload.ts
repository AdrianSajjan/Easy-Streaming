import { body, check } from "express-validator";
import { allowedImageMimeTypes, allowedVideoMimeTypes } from "../constants/mime-types";

const uploadChain = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  check("thumbnail")
    .custom((_, { req }) => {
      if (!req.files || !req.files.thumbnail || !req.files.thumbnail[0] || !allowedImageMimeTypes.includes(req.files.thumbnail[0].mimetype))
        return false;
      return true;
    })
    .withMessage("Coudn't upload thumbnail. Please select a proper thumbnail."),
  check("video")
    .custom((_, { req }) => {
      if (!req.files || !req.files.video || !req.files.video[0] || !allowedVideoMimeTypes.includes(req.files.video[0].mimetype))
        return false;
      return true;
    })
    .withMessage("Coudn't upload video. Please select a proper video."),
];

export { uploadChain };
