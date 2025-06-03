import { check } from "express-validator";
import { REG_ID } from "../../config/regex.js";
import { KEY_ACTION_CART } from "../../types/all/cart.js";
import { handleValidator } from "../../lib/middleware/handleValidator.js";

export const checkCartCLick = [
  check("bookID").matches(REG_ID).withMessage("invalid book id"),

  check("act").custom((val) =>
    Object.values(KEY_ACTION_CART).includes(val)
      ? true
      : Promise.reject("invalid action declared")
  ),

  handleValidator(422),
];
