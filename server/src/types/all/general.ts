import { Request } from "express";
import { UserRole } from "./userTypes.js";

export interface ReqApp extends Request {
  user?: {
    id: number;
    role: UserRole;
    isVerified: boolean;
  };
}
