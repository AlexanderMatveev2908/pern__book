import CloseBtn from "@/components/elements/buttons/CloseBtn";
import Title from "@/components/elements/Title";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { useAnimatePop } from "@/core/hooks/all/UI/useAnimatePop";
import { useRef, type FC } from "react";

type PropsType = {} & SearchCtxValsConsumer;

const SortPop: FC<PropsType> = ({ setBar, bars: { sortBar } }) => {
  const popRef = useRef<HTMLDivElement | null>(null);

  useAnimatePop({
    isPopup: sortBar,
    popRef,
  });

  return (
    <div
      ref={popRef}
      className={`z__popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[500px] p-4 border-[3px] border-blue-600 rounded-xl min-h-[200px] bg-neutral-950 ${
        sortBar ? "pointer-events-auto" : "pointer-events-none"
      } ${typeof sortBar === "object" ? "opacity-0" : ""} `}
    >
      <div className="w-full justify-between">
        <Title {...{ title: "sorters" }} />

        <CloseBtn
          {...{ handleClick: () => setBar({ el: "sortBar", val: false }) }}
        />
      </div>
    </div>
  );
};

export default SortPop;
