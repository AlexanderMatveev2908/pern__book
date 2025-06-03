import type { FC } from "react";

type PropsType = {
  txt: string;
};

const WrapTxt: FC<PropsType> = ({ txt }) => {
  return (
    <div className="w-full flex justify-center">
      <span
        className="txt__3 clamp_txt"
        style={{
          lineClamp: 2,
        }}
      >
        {txt}
      </span>
    </div>
  );
};

export default WrapTxt;
