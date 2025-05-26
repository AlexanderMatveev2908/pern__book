import multer from "multer";

const storage = multer.memoryStorage();

export const multerThumb = multer({ storage }).single("thumb");
