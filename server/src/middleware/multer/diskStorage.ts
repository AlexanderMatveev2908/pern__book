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
    if (!fs.existsSync(path.join(myDir, "uploads")))
      fs.mkdirSync(path.join(myDir, "uploads"));

    cb(null, path.join(myDir, "uploads"));
  },
  filename: (req, file, cb) => {
    const newName = v4(),
      ext = path.extname(file.originalname);

    cb(null, newName + ext);
  },
});

export const multerDiskStorage = multer({
  storage,
  limits: { fileSize: Infinity },
}).fields([
  { name: "video", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
