import { check } from "express-validator";
import { REG_ID, REG_TOK } from "../../../config/regex.js";
import { TokenEventType } from "../../../types/types.js";
import { handleValidator } from "../../../lib/lib.js";

export const validateVerify = [
  check("userID").matches(REG_ID).withMessage("Invalid userID format"),

  check("token").matches(REG_TOK).withMessage("Invalid token format"),

  check("event").custom((val) =>
    Object.values(TokenEventType).some(
      (event) =>
        ![TokenEventType.ACCESS, TokenEventType.REFRESH].includes(event) &&
        event === val
    )
      ? true
      : Promise.reject("Invalid event")
  ),

  handleValidator(422),
];
