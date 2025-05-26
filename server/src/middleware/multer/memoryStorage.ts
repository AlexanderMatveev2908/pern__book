import multer from "multer";

const storage = multer.memoryStorage();

export const multerMemoryStorage = multer({ storage }).array("images");
