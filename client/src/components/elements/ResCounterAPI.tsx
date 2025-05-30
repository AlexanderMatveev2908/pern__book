import type { FC } from "react";
import { LuPartyPopper } from "react-icons/lu";

type PropsType = {
  nHits: number;
};

const ResCounterAPI: FC<PropsType> = ({ nHits }) => {
  return (
    <div className="w-full flex justify-start items-center gap-5">
      {nHits ? (
        <>
          <LuPartyPopper className="icon__md" />
          <span className="txt__4">{nHits}</span>
          <span className="txt__4 -ml-2">Result{nHits > 1 ? "s" : ""}</span>
        </>
      ) : (
        <span className="txt__4">0 Results</span>
      )}
    </div>
  );
};

export default ResCounterAPI;
