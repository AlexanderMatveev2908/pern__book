import { capt, clampBy } from "@/core/lib/lib";
import type { FC } from "react";

type PropsType = {
  txt: string | number;
  customStyle?: string;
};

const WrapTxt: FC<PropsType> = ({ txt, customStyle }) => {
  return (
    <span
      className={`clamp_txt ${customStyle ?? "justify-self-center txt__2"}`}
      {...clampBy(2)}
    >
      {capt(txt + "")}
    </span>
  );
};

export default WrapTxt;
