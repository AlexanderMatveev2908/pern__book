export var TokenEventType;
(function (TokenEventType) {
  TokenEventType["ACCESS"] = "ACCESS";
  TokenEventType["REFRESH"] = "REFRESH";
  TokenEventType["VERIFY_ACCOUNT"] = "VERIFY_ACCOUNT";
  TokenEventType["FORGOT_PWD"] = "FORGOT_PWD";
  TokenEventType["CHANGE_PWD"] = "CHANGE_PWD";
  TokenEventType["CHANGE_EMAIL"] = "CHANGE_EMAIL";
})(TokenEventType || (TokenEventType = {}));
export var MsgCheckToken;
(function (MsgCheckToken) {
  MsgCheckToken["NOT_FOUND"] = "VERIFY_TOKEN_NOT_FOUND";
  MsgCheckToken["NOT_EMITTED"] = "VERIFY_TOKEN_NOT_EMITTED";
  MsgCheckToken["EXPIRED"] = "VERIFY_TOKEN_EXPIRED";
  MsgCheckToken["OK"] = "OK";
})(MsgCheckToken || (MsgCheckToken = {}));
export var ErrAppMsgCode;
(function (ErrAppMsgCode) {
  ErrAppMsgCode["ACCESS_EXPIRED"] = "ACCESS TOKEN EXPIRED";
  ErrAppMsgCode["ACCESS_INVALID"] = "ACCESS_TOKEN_INVALID";
  ErrAppMsgCode["ACCESS_NOT_PROVIDED"] = "ACCESS TOKEN NOT PROVIDED";
  ErrAppMsgCode["REFRESH_EXPIRED"] = "REFRESH TOKEN EXPIRED";
  ErrAppMsgCode["REFRESH_INVALID"] = "REFRESH TOKEN INVALID";
  ErrAppMsgCode["REFRESH_NOT_PROVIDED"] = "REFRESH TOKEN NOT PROVIDED";
})(ErrAppMsgCode || (ErrAppMsgCode = {}));
export const KeyAlgRSA = {
  RSA: "RSA-OAEP-256",
};
export const TokAlg = {
  SHA: "sha256",
  CBC_HMAC: "aes-256-cbc",
  GCM: "A256GCM",
};
