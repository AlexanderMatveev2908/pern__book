import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  fieldLoginSwitch,
  fieldsRegisterSwitch,
  fieldsSwitchForgot,
  fieldsSwitchVerify,
} from "../../../config/fields/AuthLayout/fieldsAuth.ts";
import { AuthPagesPathType } from "@/config/fields/general/fieldsActionsAuth.ts";

const SwitcherFormAuth: FC = () => {
  const path = useLocation().pathname;

  const arg =
    AuthPagesPathType.LOGIN === path
      ? fieldLoginSwitch
      : AuthPagesPathType.REGISTER === path
      ? fieldsRegisterSwitch
      : AuthPagesPathType.FORGOT_PASSWORD === path
      ? fieldsSwitchForgot
      : fieldsSwitchVerify;

  return (
    <div className="w-full txt__col grid gap-y-5 md:grid-cols-2 justify-items-center">
      {arg.map((el) => (
        <div
          key={el.id}
          className="w-fit flex items-center justify-start gap-5  group"
        >
          <el.icon className="icon__sm" />
          <div className="w-full flex items-center gap-3">
            <span className="txt__1">{el.msg}</span>
            <Link
              to={el.path}
              className="txt__2 el__flow hover:text-blue-600 el__after_below"
            >
              {el.msgBold}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SwitcherFormAuth;
