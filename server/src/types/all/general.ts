import { Request } from "express";
import { UserRole } from "./userTypes.js";

export interface ReqApp extends Request {
  user?: {
    id: number;
    role: UserRole;
    verified: boolean;
  };
}
export enum MsgHMAC {
  NOT_FOUND = "VERIFY_TOKEN_NOT_FOUND",
  EXPIRED = "VERIFY_TOKEN_EXPIRED",
  NOT_EMITTED = "VERIFY_TOKEN_NOT_EMITTED",
  OK = "OK",
}
