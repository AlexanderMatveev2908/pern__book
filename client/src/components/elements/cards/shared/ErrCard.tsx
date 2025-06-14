import type { FC } from "react";
import { TiWarning } from "react-icons/ti";

type PropsType = {
  msg: string;
};

const ErrCard: FC<PropsType> = ({ msg }) => {
  return (
    <div className="w-full flex items-center gap-8">
      <TiWarning className="icon__xl text-red-600" />

      <div className="w-full flex items-center">
        <span className="txt__3 text-red-600">{msg}</span>
      </div>
    </div>
  );
};

export default ErrCard;
