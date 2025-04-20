export enum MsgErrAccess {
  ACCESS_EXPIRED = "ACCESS_EXPIRED",
  ACCESS_INVALID = "ACCESS_INVALID",
  ACCESS_NOT_PROVIDED = "ACCESS_NOT_PROVIDED",
}

export enum MsgErrRefresh {
  REFRESH_NOT_EMITTED = "REFRESH_NOT_EMITTED ",
  REFRESH_EXPIRED = "REFRESH_EXPIRED ",
  REFRESH_INVALID = "REFRESH_INVALID ",
  REFRESH_NOT_PROVIDED = "REFRESH_NOT_PROVIDED ",
}

export enum EventApp {
  OK = "SUCCESS",
  ERR = "ERROR",
  INFO = "INFO",
}

export enum TokenEventType {
  VERIFY_ACCOUNT = "VERIFY_ACCOUNT",
  FORGOT_PWD = "FORGOT_PWD",
  CHANGE_PWD = "CHANGE_PWD",
  CHANGE_EMAIL = "CHANGE_EMAIL",
}

export enum MsgCheckToken {
  NOT_FOUND = "VERIFY_TOKEN_NOT_FOUND",
  NOT_EMITTED = "VERIFY_TOKEN_NOT_EMITTED",
  INVALID = "VERIFY_TOKEN_INVALID",
  EXPIRED = "VERIFY_TOKEN_EXPIRED",
}

export enum AllowedFromApp {
  GEN = "E9]A]X0O)&{x]2zQ",
}

export enum AvoidTriggerPath {
  LOGOUT = "/auth/logout",
}

export enum SendMailEnd {
  VERIFY_ACCOUNT = "verify-account",
  FORGOT_PWD = "forgot-pwd",
}

export enum TagsAPI {
  USER = "USER",
}
