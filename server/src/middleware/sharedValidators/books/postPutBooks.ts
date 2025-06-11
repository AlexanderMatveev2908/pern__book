import { check } from "express-validator";
import {
  REG_BOOK_TITLE,
  REG_CLOUD,
  REG_ID,
  REG_INT,
  REG_NAME,
  REG_PRICE,
  REG_STORE_DESC,
} from "../../../config/regex.js";
import { handleValidator } from "../handleValidator.js";
import { subCat } from "../../../types/all/books.js";

// ? 1 Kb = 1024 bytes
//  ? 1 Mb = 1024 Kb
const fromBytesToMb = (bytes: number) => bytes / 1024 ** 2;

export const validatePostPutBooks = [
  check("bookStoreID")
    .matches(REG_ID)
    .withMessage("Invalid bookStoreID format"),

  check("title")
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .matches(REG_BOOK_TITLE)
    .withMessage("Invalid title"),
  check("author")
    .isLength({ min: 1 })
    .withMessage("Author is required")
    .matches(REG_NAME)
    .withMessage("Invalid author"),
  check("year")
    .matches(REG_INT)
    .withMessage("Invalid year")
    .custom((val) => {
      if (val < 1450 || val > new Date().getFullYear())
        throw new Error("Year must be between 1450 and the current year");

      return true;
    }),
  check("description").custom((val) => {
    if (!val?.trim().length) return true;

    if (val.length > 12000) throw new Error("Description too long");
    if (!REG_STORE_DESC.test(val)) throw new Error("Invalid description chars");

    return true;
  }),

  check().custom((_, { req }) => {
    const images: Express.Multer.File[] = req?.files;
    if (!images?.length) return true;

    if (images.length > 5) throw new Error("Too many files");

    if (images.some((file) => fromBytesToMb(file.size) > 5))
      throw new Error("File too large");

    if (images.some((file) => !file.mimetype.startsWith("image")))
      throw new Error("File must be an image");

    const urlsImages = req.body?.images;

    if (Array.isArray(urlsImages))
      if (urlsImages.length > 5) throw new Error("Too many images");
      else if (urlsImages.some((url) => !REG_CLOUD.test(url)))
        throw new Error("invalid url");

    return true;
  }),

  check("categories").custom((val) => {
    if (!val?.length || val?.length > 5) throw new Error("Invalid categories");

    for (const cat of val) {
      if (!subCat.includes(cat)) throw new Error("developer error 😠");
    }

    return true;
  }),

  check("qty")
    .matches(REG_INT)
    .withMessage("Invalid quantity")
    .toInt()
    .isInt({ min: 0, max: 2147483647 })
    .withMessage("Quantity must be a positive Integer"),

  handleValidator(422),

  check("price")
    .matches(REG_PRICE)
    .withMessage("Invalid price")
    .custom((val) => {
      if (+(val ?? 0) < 0.01) throw new Error("Invalid price");

      if (val?.trim()?.length > 10) throw new Error("Max length exceeded");

      return true;
    }),
];
