import Title from "@/components/elements/Title";
import TooltipCpy from "@/components/elements/TooltipCpy/TooltipCpy";
import type { FC } from "react";

const WrapToolTip = ({ label, txt }: { label: string; txt: string }) => {
  return (
    <div className="w-fit grid grid-cols-2 items-center relative">
      <span className="txt__3">{label}</span>

      <TooltipCpy {...{ txt }} />
    </div>
  );
};

const DummyCards: FC = () => {
  return (
    <div className="form__size grid grid-cols-1 justify-items-center justify-self-center w-full gap-y-5">
      <Title {...{ title: "dummy cards" }} />

      <div className=" border-[3px] border-neutral-800 p-5 rounded-xl w-full grid grid-cols-1 gap-y-3">
        <span className="txt__2 text-gray-400">
          The app is using currently Stripe test-mode and will not collect any
          real payments or cards information
        </span>
        <span className="txt__3">
          You can use cards number below to test different cases, for date
          expiration enter any future date , and as CVC any random number of 3
          digits
        </span>

        <div className="w-full grid grid-cols-1 gap-y-3 border-t-2 border-blue-600 pt-4">
          <WrapToolTip {...{ label: "Visa", txt: "4242 4242 4242 4242" }} />
        </div>
      </div>
    </div>
  );
};

export default DummyCards;
