import { FC } from "react";
import s from "./SkeletonBar.module.css";

const SkeletonBar: FC = () => {
  return (
    <div
      className={`${s.skeleton} w-full min-h-[150px] border-[3px] border-neutral-800 rounded-xl skeleton`}
    ></div>
  );
};

export default SkeletonBar;
