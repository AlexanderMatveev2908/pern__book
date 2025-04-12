import { FC } from "react";
import { LuBadgeHelp } from "react-icons/lu";
import TooltipCpy from "./TooltipCpy/TooltipCpy";

const CreatePwd: FC = () => {
  return (
    <div className="w-full grid grid-cols-2">
      <div className="w-fit flex items-center justify-start gap-5 cursor-pointer el__after_below el__flow hover:text-blue-600">
        <LuBadgeHelp className="icon__md" />
        <span className="txt__2">Generate password</span>
      </div>

      <TooltipCpy />
    </div>
  );
};
export default CreatePwd;
