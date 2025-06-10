import { clampBy } from "@/core/lib/lib";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  spanInfo: {
    icon?: IconType;
    label?: string | number;
  };

  customStyleTxt?: string;
  customStyleIcon?: string;
  customStyleParent?: string;
};

const SpanInfoCard: FC<PropsType> = ({
  spanInfo,
  customStyleIcon,
  customStyleParent,
  customStyleTxt,
}) => {
  return (
    <div
      className={`${
        customStyleParent ?? ""
      } w-full max-w-fit flex justify-start gap-x-5 items-center`}
    >
      {spanInfo.icon && (
        <spanInfo.icon className={`icon__sm ${customStyleIcon ?? ""}`} />
      )}
      <span
        className={`${customStyleTxt ?? "txt__3"} clamp_txt`}
        {...clampBy(2)}
      >
        {spanInfo.label}
      </span>
    </div>
  );
};

export default SpanInfoCard;
