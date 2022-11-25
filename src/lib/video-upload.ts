import path from "path";
import multer from "multer";
import * as uuid from "uuid";

export const uploadVideo = multer({
  storage: multer.diskStorage({
    filename: (_req, file, callback) => {
      const filename = uuid.v4() + path.extname(file.originalname);
      callback(null, filename);
    },
    destination: (req, _file, callback) => {
      const user = req.user.id;
      const destination = `media/upload/${user}/`;
      callback(null, destination);
    },
  }),
});
