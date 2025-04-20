import { check } from "express-validator";
import { TokenEventType } from "../../types/types.js";

export const validateEventToken = [
  check("event").custom((val) =>
    Object.values(TokenEventType).some(
      (event) =>
        ![TokenEventType.ACCESS, TokenEventType.REFRESH].includes(event) &&
        event === val
    )
      ? true
      : Promise.reject("Invalid event")
  ),
];
