import { check } from "express-validator";
import { allowedPatchOrderStages } from "../../../types/all/orders.js";
import { handleValidator } from "../handleValidator.js";

export const checkPatchOrderBusiness = [
  check("stage").isIn(allowedPatchOrderStages).withMessage("Invalid stage"),

  handleValidator(422),
];
