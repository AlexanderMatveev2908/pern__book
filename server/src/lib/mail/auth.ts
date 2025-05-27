import { frontURL, myMail } from "../../config/env.js";
import mailer from "../../config/mail.js";
import { UserInstance } from "../../models/models.js";
import { TokenEventType } from "../../types/types.js";
import { getHtmlMail } from "./html/template.js";

const getTxt = (event: TokenEventType) => {
  let txt = "";
  let labelBtn = "";
  let subject = "";

  switch (event) {
    case TokenEventType.VERIFY_ACCOUNT:
      txt = "verify your account";
      labelBtn = "Verify Account";
      subject = "VERIFY ACCOUNT";
      break;
    case TokenEventType.FORGOT_PWD:
      txt = "recover your account";
      labelBtn = "Recover Account";
      subject = "RECOVER ACCOUNT";
      break;
    case TokenEventType.CHANGE_EMAIL:
      txt = "change your email";
      labelBtn = "verify email";
      subject = "CHANGE EMAIL";
      break;

    default:
      throw new Error(`=> Invalid event: ${event}`);
  }

  return {
    txt,
    labelBtn,
    subject,
  };
};

export const sendEmailAuth = async ({
  user,
  token,
  event,
  newEmail,
}: {
  user: UserInstance;
  token: string;
  event: TokenEventType;
  newEmail?: string;
}) => {
  if ([user, token, event].some((el) => !el))
    throw new Error("=> Missing data mail transporter");

  const verifyURL = `${frontURL}/verify-cb?token=${token}&userID=${user.id}&event=${event}`;
  const { txt, labelBtn, subject } = getTxt(event);

  await mailer.sendMail({
    from: myMail,
    to: newEmail ?? user.email,
    subject,
    html: getHtmlMail({
      firstName: user.firstName,
      txt,
      url: verifyURL,
      labelBtn,
    }),
  });
};
