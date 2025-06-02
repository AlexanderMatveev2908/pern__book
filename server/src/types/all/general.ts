import { Request } from "express";

export interface ReqApp extends Request {
  userID?: string;
}
