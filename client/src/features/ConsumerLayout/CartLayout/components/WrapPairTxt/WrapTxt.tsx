import type { FC } from "react";

type PropsType = {
  txt: string | number;
  customStyle?: string;
};

const WrapTxt: FC<PropsType> = ({ txt, customStyle }) => {
  return (
    <span
      className={`txt__3 clamp_txt ${customStyle ?? "justify-self-center"}`}
      style={{
        lineClamp: 2,
      }}
    >
      {txt}
    </span>
  );
};

export default WrapTxt;
