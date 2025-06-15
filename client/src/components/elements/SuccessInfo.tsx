import { CircleCheckBig } from "lucide-react";
import type { FC } from "react";

type PropsType = {
  msg: string;
};

const SuccessInfo: FC<PropsType> = ({ msg }) => {
  return (
    <div className="w-full flex items-center gap-6 justify-center">
      <CircleCheckBig className="icon__xl text-green-600" />

      <span className="txt__3">{msg}</span>
    </div>
  );
};

export default SuccessInfo;
