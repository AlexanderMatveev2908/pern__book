import { check } from "express-validator";

export const validateVerifyToken = [
  check("token").trim().notEmpty().withMessage("Invalid token"),
];
