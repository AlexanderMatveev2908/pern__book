import { FC } from "react";

const SkeletonBar: FC = () => {
  return (
    <div className="w-full min-h-[150px] border-[3px] border-neutral-800 rounded-xl search_bar__skeleton"></div>
  );
};

export default SkeletonBar;
