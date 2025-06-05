import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  spanInfo: {
    icon?: IconType;
    info?: string;
  };
};

const SpanInfoCard: FC<PropsType> = ({ spanInfo }) => {
  return (
    <div className="w-full flex justify-start gap-x-5 items-center">
      {spanInfo.icon && <spanInfo.icon className="icon__sm" />}
      <span className="txt__3">{spanInfo.info}</span>
    </div>
  );
};

export default SpanInfoCard;
