import type { FC } from "react";
import WrapTxt from "./WrapTxt";

type PropsType = {
  arg: string[];
};

const WrapPairTxt: FC<PropsType> = ({ arg }) => {
  return (
    <div className="w-full grid grid-cols-2">
      <WrapTxt {...{ txt: arg[0], customStyle: "justify-self-start txt__2" }} />

      <WrapTxt {...{ txt: arg[1], customStyle: "justify-self-end txt__2" }} />
    </div>
  );
};

export default WrapPairTxt;
