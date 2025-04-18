export enum MsgErrSession {
  ACCESS_EXPIRED = "ACCESS_EXPIRED",
  ACCESS_INVALID = "ACCESS_INVALID",
  ACCESS_NOT_PROVIDED = "ACCESS_NOT_PROVIDED",

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

export enum AllowedFromNotice {
  REGISTER = "/auth/register",
  FORGOT_PWD = "/auth/forgot-pwd",
  VERIFY_ACCOUNT = "/auth/verify-cb",
  EXP = "EXP",
  GEN = "GEN",
}

export enum TagsAPI {
  USER = "USER",
}
