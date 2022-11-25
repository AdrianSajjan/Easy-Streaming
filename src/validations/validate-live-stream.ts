import { body, check } from "express-validator";
import { allowedImageMimeTypes } from "../constants/mime-types";

const streamChain = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("streamKey").notEmpty().withMessage("Stream Key cannot be empty"),
  check("thumbnail")
    .custom((_, { req }) => {
      if (!req.file || !allowedImageMimeTypes.includes(req.file.mimetype)) return false;
      return true;
    })
    .withMessage("Coudn't upload thumbnail. Please select a proper thumbnail."),
];

export { streamChain };
