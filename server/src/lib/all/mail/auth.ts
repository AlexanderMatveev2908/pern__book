import { frontURL, myMail } from "../../../config/env.js";
import mailer from "../../../config/mail.js";
import { TokenEventType, UserType } from "../../../types/types.js";
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
}: {
  user: UserType;
  token: string;
  event: TokenEventType;
}) => {
  if ([user, token, event].some((el) => !el)) return;

  const verifyURL = `${frontURL}/verify?token=${token}&userID=${
    user.id + ""
  }&event=${event}`;
  const { txt, labelBtn, subject } = getTxt(event);

  await mailer.sendMail({
    from: myMail,
    to: user.email,
    subject,
    html: getHtmlMail({
      firstName: user.firstName,
      txt,
      url: verifyURL,
      labelBtn,
    }),
  });
};
