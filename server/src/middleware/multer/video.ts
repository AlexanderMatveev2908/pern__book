import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

export const myDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(path.join(myDir, "video")))
      fs.mkdirSync(path.join(myDir, "video"));

    cb(null, path.join(myDir, "video"));
  },
  filename: (req, file, cb) => {
    const newName = v4();
    cb(null, newName + path.extname(file.originalname));
  },
});

export const multerVideo = multer({
  storage,
  limits: {
    fileSize: 250 * 1024 * 1024,
  },
}).single("video");
