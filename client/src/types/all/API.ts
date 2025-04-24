import { AxiosResponse } from "axios";

export enum EventApp {
  OK = "SUCCESS",
  ERR = "ERROR",
  INFO = "INFO",
}

export enum SendMailEnd {
  VERIFY_ACCOUNT = "verify-account",
  FORGOT_PWD = "forgot-pwd",
}

export enum TagsAPI {
  USER = "USER",
}

export interface ResApp extends AxiosResponse {
  data: {
    msg: string;
    message?: string;
    ok: boolean;
  };
}
