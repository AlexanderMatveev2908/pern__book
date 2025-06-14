import { clampBy } from "@/core/lib/lib";
import type { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  label: {
    icon?: IconType;
    label?: string;
  };
  customStyleParent?: string;
};

const SpanTitleCard: FC<PropsType> = ({ customStyleParent, label }) => {
  return (
    <div
      className={`${
        customStyleParent ?? ""
      } w-full flex justify-start items-center gap-5 px-3 py-2 bg-black/50 rounded-xl h-fit`}
    >
      {label.icon && <label.icon className="icon__md" />}

      <div className="w-full flex justify-start items-center">
        <span className="txt__4 clamp_txt" {...clampBy(2)}>
          {label.label}
        </span>
      </div>
    </div>
  );
};

export default SpanTitleCard;
