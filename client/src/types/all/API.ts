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
  DUMMY_LIST = "DUMMY_LIST",
  // STORES_INFO = "STORES_INFO",
  BOOK_OWNER = "BOOK_OWNER",
  BOOKS_OWNER_LIST = "BOOKS_OWNER_LIST",
  JUNCTIONS_BOOK_STORE_USER_LIST = "JUNCTIONS_BOOK_STORE_USER_LIST",
  JUNCTION_BOOK_STORE_USER = "JUNCTION_BOOK_STORE_USER",
  BOOK_WORKER = "BOOK_WORKER",
}

export interface ResApp extends AxiosResponse {
  data: {
    msg: string;
    message?: string;
    ok: boolean;
  };
}

export type BaseResAPI<T> = {
  ok: boolean;
  status: number;
  msg: string;
  ninja?: string;
} & T;

export type ResPaginationAPI<T> = {
  totPages: number;
  nHits: number;
} & T;

export type ReqQueryAPI<T> = {
  page: number;
  limit: number;
  _?: number;
} & T;
