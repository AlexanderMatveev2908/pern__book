import { check, ExpressValidator } from "express-validator";
import {
  REG_PHONE,
  REG_PRICE,
  REG_STORE_DESC,
  REG_STORE_NAME,
} from "../../config/regex.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";
import validator from "validator";
import { validateAddress } from "../sharedValidators/address.js";

const MAX_MB_IMG = 1024 * 1024 * 5;
// ? COULD BE TOO MUCH FOR HOST PLATFORM SO SERVER COULD EASILY CRASH
const MAX_MB_VID = 1024 * 1024 * 250;

export const validateStore = [
  check("name")
    .isLength({ min: 2, max: 50 })
    .withMessage("Invalid length name")
    .matches(REG_STORE_NAME)
    .withMessage("Invalid name store chars"),

  check("description").custom((val) => {
    if (!val?.length) return true;

    if (val.length > 200) throw new Error("Description too long");
    if (!REG_STORE_DESC.test(val)) throw new Error("Invalid description chars");
  }),

  check().custom((_, { req }) => {
    const images = req.files.images as Express.Multer.File[] | undefined;
    if (images?.length) {
      let i = 0;

      do {
        const curr = images[i] as Express.Multer.File;

        if (!curr.mimetype.startsWith("image"))
          throw new Error("Invalid image type");
        if (curr.size > MAX_MB_IMG)
          throw new Error(`Image ${curr.originalname} is too large 😠`);

        i++;
      } while (i < images.length);

      const video = req.files.video as Express.Multer.File[] | undefined;

      if (video?.length) {
        // * ALSO UNIQUE
        const curr = video[0];

        if (!curr.mimetype.startsWith("video"))
          throw new Error("Invalid video type");
        if (curr.size > MAX_MB_VID)
          throw new Error(`Video ${curr.originalname} is too large 😠`);
      }

      return true;
    }
  }),

  check("categories")
    .isArray()
    .withMessage("Invalid format categories")
    .custom((val) =>
      !val?.length
        ? Promise.reject("Category not provided")
        : val?.length > 3
        ? Promise.reject("Categories too much")
        : true
    ),

  check("email").isEmail().withMessage("Invalid email format"),

  check("website").custom((val) =>
    !val?.length || (validator.isURL(val) && val?.startsWith("https"))
      ? true
      : Promise.reject("Invalid url website")
  ),

  ...validateAddress(),

  check("deliveryPrice").custom((val) =>
    !val?.length || (REG_PRICE.test(val) && +val > 0.01)
      ? true
      : Promise.reject("Invalid price")
  ),

  check("freeDeliveryAmount").custom((val) =>
    !val?.length || (REG_PRICE.test(val) && +val > 0.01)
      ? true
      : Promise.reject("Invalid free delivery amount")
  ),

  handleValidator(422),
];
