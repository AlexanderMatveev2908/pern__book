import { Request, Response } from "express";
import { ReqApp, TokenEventType } from "../../types/types.js";
import { Token, User } from "../../models/models.js";
import { Op } from "sequelize";
import { err401, err404, err409 } from "../../lib/responseClient/err.js";
import { genAccessJWT, prepareHeader } from "../../lib/hashEncryptSign/JWT.js";
import { genTokenCBC } from "../../lib/hashEncryptSign/cbcHmac.js";
import {
  clearCookie,
  genTokenJWE,
  setCookie,
} from "../../lib/hashEncryptSign/JWE.js";
import { sendEmailAuth } from "../../lib/mail/auth.js";
import { res200, res201 } from "../../lib/responseClient/res.js";
import { verifyPwd } from "../../lib/hashEncryptSign/argon.js";
import { clearOldTokens } from "../../lib/clearData.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const newUser = User.build(req.body);

  let userID: string | null = null;

  if (await newUser.existUser())
    return err409(res, { msg: "User already exists" });

  newUser.capitalize();
  await newUser.hashPwdUser();

  userID = newUser.id;

  try {
    const accessToken = genAccessJWT(newUser);
    const tokenData = await genTokenCBC({
      user: newUser,
      event: TokenEventType.VERIFY_ACCOUNT,
    });

    const refreshToken = await genTokenJWE(newUser);

    await sendEmailAuth({
      user: newUser,
      token: tokenData!.verifyToken,
      event: TokenEventType.VERIFY_ACCOUNT,
    });

    setCookie(res, refreshToken);

    return res201(res, { msg: "Account created", accessToken });
  } catch (err: any) {
    if (userID) await User.destroy({ where: { id: userID } });

    throw err;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return err404(res, { msg: "user not found" });

  const match = await verifyPwd(user.password, password);
  if (!match) return err401(res, { msg: "invalid credentials" });

  const accessToken = genAccessJWT(user);
  const refreshToken = await genTokenJWE(user);

  setCookie(res, refreshToken);

  return res.status(200).json({ msg: "login successful", accessToken });
};

export const logoutUser = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const accessExp = prepareHeader(req);

  clearCookie(res);

  const user = await User.findByPk(userID ?? "");

  if (!userID || !user) {
    if (accessExp) await clearOldTokens(accessExp);

    return res200(res, { msg: "logout successful" });
  }

  await Token.destroy({
    where: {
      userID: user.id,
      [Op.or]: [
        {
          event: {
            [Op.in]: [
              ...Object.values(TokenEventType).filter(
                (tok) => tok !== TokenEventType.VERIFY_ACCOUNT
              ),
            ],
          },
        },
        {
          expiry: {
            [Op.lte]: Date.now(),
          },
        },
      ],
    },
  });
  return res200(res, { msg: "logout successful" });
};
