export var TokenEventType;
(function (TokenEventType) {
    TokenEventType["ACCESS"] = "ACCESS";
    TokenEventType["REFRESH"] = "REFRESH";
    TokenEventType["VERIFY_ACCOUNT"] = "VERIFY_ACCOUNT";
    TokenEventType["FORGOT_PWD"] = "FORGOT_PWD";
    TokenEventType["CHANGE_PWD"] = "CHANGE_PWD";
    TokenEventType["CHANGE_EMAIL"] = "CHANGE_EMAIL";
})(TokenEventType || (TokenEventType = {}));
export var MsgHMAC;
(function (MsgHMAC) {
    MsgHMAC["NOT_FOUND"] = "VERIFY_TOKEN_NOT_FOUND";
    MsgHMAC["NOT_EMITTED"] = "VERIFY_TOKEN_NOT_EMITTED";
    MsgHMAC["EXPIRED"] = "VERIFY_TOKEN_EXPIRED";
    MsgHMAC["OK"] = "OK";
})(MsgHMAC || (MsgHMAC = {}));
