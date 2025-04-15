import { frontURL, myMail } from "../../../config/env.js";
import mailer from "../../../config/mail.js";
import { UserType } from "../../../models/models.js";
import { MailEventType } from "../../../types/types.js";
import { getHtmlMail } from "./html/template.js";

const getTxt = (event: MailEventType) => {
  let txt = "";
  let labelBtn = "";
  switch (event) {
    case MailEventType.VERIFY_ACCOUNT:
      txt = "verify your account";
      labelBtn = "Verify Account";
      break;
    case MailEventType.FORGOT_PWD:
      txt = "recover your account";
      labelBtn = "Recover Account";
      break;
    default:
      throw new Error(`=> Invalid event: ${event}`);
  }

  return {
    txt,
    labelBtn,
  };
};

export const sendEmailAuth = async ({
  user,
  token,
  event,
}: {
  user: UserType;
  token: string;
  event: MailEventType;
}) => {
  if ([user, token, event].some((el) => !el)) return;

  const verifyURL = `${frontURL}/verify?token=${token}&userID=${
    user.id + ""
  }&event=${event}`;
  const { txt, labelBtn } = getTxt(event);

  await mailer.sendMail({
    from: myMail,
    to: user.email,
    html: getHtmlMail({
      firstName: user.firstName,
      txt,
      url: verifyURL,
      labelBtn,
    }),
  });
};
