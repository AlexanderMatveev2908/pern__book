"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokAlg = exports.KeyAlgRSA = exports.MsgErrSession = exports.MsgCheckToken = exports.TokenEventType = void 0;
var TokenEventType;
(function (TokenEventType) {
    // ACCESS = "f425af169807b278a106a5c9b5655b6c",
    TokenEventType["REFRESH"] = "REFRESH";
    TokenEventType["VERIFY_ACCOUNT"] = "VERIFY_ACCOUNT";
    TokenEventType["FORGOT_PWD"] = "FORGOT_PWD";
    TokenEventType["CHANGE_EMAIL"] = "CHANGE_EMAIL";
    TokenEventType["SECURITY"] = "SECURITY";
    // REFRESH = "2cabf1c5931647c1aa6042d649b09dc6",
    // VERIFY_ACCOUNT = "ed29cfcac10efcbb5a76b139f8226d6",
    // FORGOT_PWD = "4f60a8f192560fa55764ac9ed3d5faf9",
    // CHANGE_EMAIL = "9086aa36957000093a3d72ab100004b0",
    // SECURITY = "f48100f806d741e8b7daf3a206a6ba24",
})(TokenEventType || (exports.TokenEventType = TokenEventType = {}));
var MsgCheckToken;
(function (MsgCheckToken) {
    MsgCheckToken["NOT_FOUND"] = "VERIFY_TOKEN_NOT_FOUND";
    MsgCheckToken["NOT_EMITTED"] = "VERIFY_TOKEN_NOT_EMITTED";
    MsgCheckToken["NOT_PROVIDED"] = "VERIFY_TOKEN_NOT_PROVIDED";
    MsgCheckToken["INVALID"] = "VERIFY_TOKEN_INVALID";
    MsgCheckToken["EXPIRED"] = "VERIFY_TOKEN_EXPIRED";
    MsgCheckToken["OK"] = "OK";
})(MsgCheckToken || (exports.MsgCheckToken = MsgCheckToken = {}));
var MsgErrSession;
(function (MsgErrSession) {
    MsgErrSession["ACCESS_EXPIRED"] = "ACCESS_EXPIRED";
    MsgErrSession["ACCESS_INVALID"] = "ACCESS_INVALID";
    MsgErrSession["ACCESS_NOT_PROVIDED"] = "ACCESS_NOT_PROVIDED";
    MsgErrSession["REFRESH_NOT_EMITTED"] = "REFRESH_NOT_EMITTED ";
    MsgErrSession["REFRESH_EXPIRED"] = "REFRESH_EXPIRED ";
    MsgErrSession["REFRESH_INVALID"] = "REFRESH_INVALID ";
    MsgErrSession["REFRESH_NOT_PROVIDED"] = "REFRESH_NOT_PROVIDED ";
})(MsgErrSession || (exports.MsgErrSession = MsgErrSession = {}));
exports.KeyAlgRSA = {
    RSA: "RSA-OAEP-256",
};
exports.TokAlg = {
    SHA: "sha256",
    CBC_HMAC: "aes-256-cbc",
    GCM: "A256GCM",
};
