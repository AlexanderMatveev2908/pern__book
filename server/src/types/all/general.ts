import { Request } from "express";
import { UserRole } from "../../models/models.js";

export interface ReqApp extends Request {
  user?: {
    id: number;
    role: UserRole;
    verified: boolean;
  };
}
