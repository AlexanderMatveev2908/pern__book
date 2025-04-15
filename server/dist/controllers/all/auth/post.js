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
import {
  calcTimeRun,
  capChar,
  genAccessJWT,
  err409,
  hashPwd,
  res201,
} from "../../../lib/lib.js";
import { User } from "../../../models/models.js";
export const registerUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const existingUser = yield User.findOne({
      where: { email: newUser.email },
    });
    if (existingUser) return err409(res, { msg: "User already exists" });
    newUser.password = yield calcTimeRun(() => hashPwd(newUser.password));
    const newSqlUser = yield User.create(
      Object.assign(Object.assign({}, newUser), {
        firstName: capChar(newUser.firstName),
        lastName: capChar(newUser.lastName),
      })
    );
    const accessToken = genAccessJWT(newSqlUser);
    return res201(res, { msg: "Account created", accessToken });
  });
export const loginUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log(user);
    return res.status(200).json({ ok: true });
  });
