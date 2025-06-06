import type { FC } from "react";
import WrapTxt from "./WrapTxt";

type PropsType = {
  arg: string[];
  customStyles?: string[];
};

const WrapPairTxt: FC<PropsType> = ({ arg, customStyles }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <WrapTxt
        {...{
          txt: arg[0],
          customStyle: `${customStyles?.[0] ?? "justify-self-start txt__2"}`,
        }}
      />

      <WrapTxt
        {...{
          txt: arg[1],
          customStyle: `${customStyles?.[1] ?? "justify-self-end txt__2"}`,
        }}
      />
    </div>
  );
};

export default WrapPairTxt;
