import type { FC } from "react";

type PropsType = {};

const BriefSummary: FC<PropsType> = ({}) => {
  return (
    <div className="w-full max-w-[500px] sm:max-w-[600px] border-[3px] border-neutral-800 rounded-xl p-5"></div>
  );
};

export default BriefSummary;
