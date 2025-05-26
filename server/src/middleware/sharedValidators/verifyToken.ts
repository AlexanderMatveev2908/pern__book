import { check } from "express-validator";
import { REG_TOK } from "../../config/regex.js";
import { MsgCheckToken } from "../../types/types.js";
import { formatMsgApp } from "../../lib/utils/formatters.js";

export const validateVerifyToken = [
  check("token")
    .trim()
    .notEmpty()
    .withMessage(formatMsgApp(MsgCheckToken.NOT_PROVIDED))
    .matches(REG_TOK)
    .withMessage(formatMsgApp(MsgCheckToken.INVALID)),
];
