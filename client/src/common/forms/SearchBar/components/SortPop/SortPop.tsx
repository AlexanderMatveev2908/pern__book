import CloseBtn from "@/components/elements/buttons/CloseBtn";
import Title from "@/components/elements/Title";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { useAnimatePop } from "@/core/hooks/all/UI/useAnimatePop";
import { SorterSearch } from "@/types/types";
import { useRef, type FC } from "react";
import PairSort from "./PairSort";

type PropsType = {
  sorters: SorterSearch[];
  ctx: SearchCtxValsConsumer;
};

const SortPop: FC<PropsType> = ({ sorters, ctx }) => {
  const popRef = useRef<HTMLDivElement | null>(null);
  const {
    setBar,
    bars: { sortBar },
  } = ctx;

  useAnimatePop({
    isPopup: sortBar,
    popRef,
  });

  return (
    <div
      ref={popRef}
      className={`z__popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[600px] max-h-[500px] border-[3px] border-blue-600 rounded-xl min-h-[200px] bg-neutral-950 h-full flex flex-col overflow-hidden ${
        sortBar ? "pointer-events-auto" : "pointer-events-none"
      } ${typeof sortBar === "object" ? "opacity-0" : ""} `}
    >
      <div className="w-full justify-between sticky top-0 left-0 z-50 bg-neutral-950  py-2 pb-3 border-b-[3px] border-blue-600 px-10">
        <Title {...{ title: "sorters" }} />

        <CloseBtn
          {...{ handleClick: () => setBar({ el: "sortBar", val: false }) }}
        />
      </div>

      <div className="overflow-y-auto scrollbar__y scrollbar__app  w-full h-fit max-h-full flex-1 grid grid-cols-1 py-4 items-start gap-5">
        {sorters.map((el) => (
          <PairSort key={el.id} {...{ ctx, el }} />
        ))}
      </div>
    </div>
  );
};

export default SortPop;
