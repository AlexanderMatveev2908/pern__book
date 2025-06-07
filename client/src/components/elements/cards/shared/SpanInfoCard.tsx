import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  spanInfo: {
    icon?: IconType;
    label?: string | number;
  };

  customStyleIcon?: string;
};

const SpanInfoCard: FC<PropsType> = ({ spanInfo, customStyleIcon }) => {
  return (
    <div className="w-full max-w-fit flex justify-start gap-x-5 items-center">
      {spanInfo.icon && (
        <spanInfo.icon className={`icon__sm ${customStyleIcon ?? ""}`} />
      )}
      <span className="txt__3">{spanInfo.label}</span>
    </div>
  );
};

export default SpanInfoCard;
