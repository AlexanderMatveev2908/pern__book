var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { MsgErrSession } from "../../../types/types.js";
import { err401, handleErrAccessToken, verifyJWT } from "../../../lib/lib.js";
export const getUserID = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authHeader =
      (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
    const accessToken =
      authHeader === null || authHeader === void 0
        ? void 0
        : authHeader.split(" ")[1];
    const { refreshToken } = req.cookies;
    if (!accessToken) {
      if (!refreshToken) return next();
      else return err401(res, { msg: MsgErrSession.ACCESS_NOT_PROVIDED });
    }
    try {
      const decoded = verifyJWT(accessToken);
      req.userID = decoded.id;
      return next();
    } catch (err) {
      return handleErrAccessToken(res, err);
    }
  });
