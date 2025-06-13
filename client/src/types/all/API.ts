/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryDefinition,
  TypedLazyQueryTrigger,
  TypedUseLazyQueryStateResult,
} from "@reduxjs/toolkit/query/react";
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
  BOOK_OWNER = "BOOK_OWNER",
  BOOKS_OWNER_LIST = "BOOKS_OWNER_LIST",
  OWNER_ORDERS_LIST = "OWNER_ORDERS_LIST",

  BOOK_STORE_WORKER_LIST = "BOOK_STORE_WORKER_LIST",
  BOOK_STORE_WORKER = "BOOK_STORE_WORKER",
  BOOK_WORKER = "BOOK_WORKER",
  BOOKS_WORKER_LIST = "BOOKS_WORKER_LIST",
  ORDERS_WORKER_LIST = "ORDERS_WORKER_LIST",

  // STORES_INFO = "STORES_INFO",
  DUMMY_LIST = "DUMMY_LIST",

  BOOKS_SEARCH_HOME = "BOOKS_SEARCH_HOME",
  BOOKS_CONSUMER_LIST = "BOOKS_CONSUMER_LIST",
  BOOK_CONSUMER = "BOOK_CONSUMER",
  USER_CART = "USER_CART",
  ORDERS_CONSUMER_LIST = "ORDERS_CONSUMER_LIST",
  ORDER_CONSUMER = "ORDER_CONSUMER",
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

export type TriggerRTK = [
  TypedLazyQueryTrigger<QueryDefinition<any, any, any, any, any>, any, any>,
  TypedUseLazyQueryStateResult<
    QueryDefinition<any, any, any, any, any>,
    any,
    any
  >
];
