import type { FC } from "react";

type PropsType = {
  arg: string[];
};

const WrapTxt: FC<PropsType> = ({ arg }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <span
        className="txt__3 clamp_txt justify-self-start"
        style={{
          lineClamp: 2,
        }}
      >
        {arg[0]}
      </span>
      <span
        className="txt__2 clamp_txt justify-self-end text-end"
        style={{
          lineClamp: 2,
        }}
      >
        {arg[1]}
      </span>
    </div>
  );
};

export default WrapTxt;
