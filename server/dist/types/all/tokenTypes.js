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
    MsgCheckToken["INVALID"] = "VERIFY_TOKEN_INVALID";
    MsgCheckToken["EXPIRED"] = "VERIFY_TOKEN_EXPIRED";
    MsgCheckToken["OK"] = "OK";
})(MsgCheckToken || (MsgCheckToken = {}));
export var MsgErrSession;
(function (MsgErrSession) {
    MsgErrSession["ACCESS_EXPIRED"] = "ACCESS_EXPIRED";
    MsgErrSession["ACCESS_INVALID"] = "ACCESS_INVALID";
    MsgErrSession["ACCESS_NOT_PROVIDED"] = "ACCESS_NOT_PROVIDED";
    MsgErrSession["REFRESH_NOT_EMITTED"] = "REFRESH_NOT_EMITTED ";
    MsgErrSession["REFRESH_EXPIRED"] = "REFRESH_EXPIRED ";
    MsgErrSession["REFRESH_INVALID"] = "REFRESH_INVALID ";
    MsgErrSession["REFRESH_NOT_PROVIDED"] = "REFRESH_NOT_PROVIDED ";
})(MsgErrSession || (MsgErrSession = {}));
export const KeyAlgRSA = {
    RSA: "RSA-OAEP-256",
};
export const TokAlg = {
    SHA: "sha256",
    CBC_HMAC: "aes-256-cbc",
    GCM: "A256GCM",
};
