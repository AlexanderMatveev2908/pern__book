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
  NOT_FOUND = "NOT_FOUND",
  EXPIRED = "EXPIRED",
  NOT_EMITTED = "NOT_EMITTED",
  OK = "OK",
}
