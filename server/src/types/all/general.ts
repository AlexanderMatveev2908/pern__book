import { Request } from "express";
import { UserRole } from "../../models/models.js";

export interface ReqApp extends Request {
  user?: {
    id: number;
    role: UserRole;
    verified: boolean;
  };
}

export enum TokenEventType {
  ACCESS = "ACCESS",
  REFRESH = "REFRESH",
  VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
  FORGOT_PWD = "FORGOT_PWD",
  CHANGE_PWD = "CHANGE_PWD",
  CHANGE_EMAIL = "CHANGE_EMAIL",
}

export enum MsgHMAC {
  NOT_FOUND = "NOT_FOUND",
  EXPIRED = "EXPIRED",
  NOT_EMITTED = "NOT_EMITTED",
  OK = "OK",
}
