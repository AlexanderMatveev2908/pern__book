import SpanInfoCard from "@/components/elements/cards/shared/SpanInfoCard";
import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import { FC } from "react";
import { IconType } from "react-icons/lib";

type PropsType = {
  label: string;
  txt: string;
  customStyleParent?: string;
  icon?: IconType;
};

const WrapToolTipCard: FC<PropsType> = ({
  label,
  icon,
  txt,
  customStyleParent,
}) => {
  return (
    <div className="w-full grid grid-cols-2 items-center">
      <SpanInfoCard
        {...{
          spanInfo: { label, icon },
          customStyleParent,
          customStyleTxt: "txt__2",
        }}
      />

      <div className="w-full justify-center relative">
        <TooltipCpy {...{ txt }} />
      </div>
    </div>
  );
};

export default WrapToolTipCard;
