import { AxiosResponse } from "axios";

export enum EventApp {
  OK = "SUCCESS",
  ERR = "ERROR",
  INFO = "INFO",
}

export enum SendMailEnd {
  VERIFY_ACCOUNT = "verify-account",
  VERIFY_ACCOUNT_LOGGED = "verify-account-logged",
  FORGOT_PWD = "forgot-pwd",
}

export enum TagsAPI {
  USER = "USER",
  BOOK_STORE = "BOOK_STORE",
  BOOK_STORE_LIST = "BOOK_STORE_LIST",
}

export interface ResApp extends AxiosResponse {
  data: {
    msg: string;
    message?: string;
    ok: boolean;
  };
}

export type BaseResAPI<T> = { ok: boolean; status: number; msg: string } & T;

export type ResPaginationAPI<T> = {
  totPages: number;
  nHits: number;
} & T;

export type ReqQueryAPI<T> = {
  page: number;
  limit: number;
  _?: number;
} & T;
