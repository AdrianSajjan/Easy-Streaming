import path from "path";
import multer from "multer";
import * as uuid from "uuid";
import fs from "fs";

export const uploadImage = multer({
  storage: multer.diskStorage({
    filename: (_req, file, callback) => {
      const filename = uuid.v4() + path.extname(file.originalname);
      callback(null, filename);
    },
    destination: (req, _file, callback) => {
      const destination = `static/profile/`;
      if (!fs.existsSync(destination)) fs.mkdirSync(destination, { recursive: true });
      callback(null, destination);
    },
  }),
});
