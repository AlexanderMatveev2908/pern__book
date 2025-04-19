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
import { TokenEventType } from "../../../types/types.js";
import { User } from "../../../models/models.js";
import { err404, err409, genTokSendEmail, res200 } from "../../../lib/lib.js";
export const sendEmailVerifyAccount = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User.findOne({
      where: { email },
    });
    if (!user) return err404(res, { msg: "user not found" });
    if (user.isVerified) return err409(res, { msg: "user already verified" });
    yield genTokSendEmail({ user, event: TokenEventType.VERIFY_ACCOUNT });
    return res200(res, { msg: "email send successfully" });
  });
