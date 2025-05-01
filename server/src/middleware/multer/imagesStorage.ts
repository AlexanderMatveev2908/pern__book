import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 } from "uuid";

export const myDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(path.join(myDir, "images")))
      fs.mkdirSync(path.join(myDir, "images"));

    cb(null, path.join(myDir, "images"));
  },
  filename: (req, file, cb) => {
    const newName = v4(),
      ext = path.extname(file.originalname);

    cb(null, newName + ext);
  },
});

export const multerImagesDisk = multer({ storage }).array("images", 5);
