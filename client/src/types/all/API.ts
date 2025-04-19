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

export enum AllowedFromNotice {
  REGISTER = ",g1&L'(8Oiw%Dfhz",
  FORGOT_PWD = ",GG?$4]GYw_fIdmX",
  VERIFY_ACCOUNT = "%1~#+8oM7I3fOe3f",
  EXP = "X+=8'clYoWq0y*,q",
  GEN = "E9]A]X0O)&{x]2zQ",
}

export enum AvoidTriggerPath {
  LOGOUT = "/auth/logout",
}

export enum SendMailEnd {
  VERIFY_ACCOUNT = "verify-account",
}

export enum TagsAPI {
  USER = "USER",
}
