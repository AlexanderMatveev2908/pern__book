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

  children?: React.ReactNode | React.ReactNode[] | null;
};

const SpanInfoCard: FC<PropsType> = ({
  spanInfo,
  customStyleIcon,
  customStyleParent,
  customStyleTxt,
  children,
}) => {
  return (
    <div
      className={`${
        customStyleParent ?? ""
      } w-full max-w-fit flex justify-start gap-x-5 items-center`}
    >
      {spanInfo.icon && (
        <spanInfo.icon className={` ${customStyleIcon ?? "icon__sm"}`} />
      )}
      {children}

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
