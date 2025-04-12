import { FC, useState } from "react";
import { LuBadgeHelp } from "react-icons/lu";
import TooltipCpy from "./TooltipCpy/TooltipCpy";
import { mixArr } from "../../lib/random";
import { charsPwd } from "../../config/fields/AuthLayout/fieldsAuth";
import { REG_PWD } from "../../config/regex";

const CreatePwd: FC = () => {
  const [pwd, setPwd] = useState("");

  const genPwd = (arr: string[]) => {
    const MAX_LEN = 16;
    const MAX_ATTEMPTS = 100;
    let attempt = 0;
    const arrBytes = new Uint8Array(MAX_LEN);
    let formatted: string = "";

    while (!REG_PWD.test(formatted) && attempt < MAX_ATTEMPTS) {
      window.crypto.getRandomValues(arrBytes);

      const pwd: string[] = [];
      let i = MAX_LEN - 1;

      do {
        const index = arrBytes[i] % arr.length;
        pwd[i] = arr[index];

        i--;
      } while (i >= 0);

      formatted = pwd.join("");
      attempt++;
    }

    return attempt < MAX_ATTEMPTS ? formatted : "";
  };

  const handleBtnCLick = () => {
    const mixed = mixArr(charsPwd);
    const newPwd = genPwd(mixed);
    setPwd(newPwd);
  };

  return (
    <div className="w-full grid grid-cols-2">
      <button
        type="button"
        onClick={handleBtnCLick}
        className="w-fit flex items-center justify-start gap-5 cursor-pointer el__after_below el__flow hover:text-blue-600 appearance-none"
      >
        <LuBadgeHelp className="icon__md" />
        <span className="txt__2">Generate password</span>
      </button>

      <TooltipCpy {...{ txt: pwd }} />
    </div>
  );
};
export default CreatePwd;

/*
  const genPwd = (arr: string[]) => {
    const LEN_PWD = 16;
    const arrBytes = new Uint8Array(LEN_PWD);
    window.crypto.getRandomValues(arrBytes);

    const pwd: string[] = [];

    let i = LEN_PWD - 1;
    do {
      const index = arrBytes[i] % LEN_PWD;
      console.log(index);
      pwd[i] = arr[index];

      i--;
    } while (i >= 0);

    const formatted = pwd.join("");
    if (!REG_PWD.test(formatted)) return genPwd(arr);

    return formatted;
  };
  */
