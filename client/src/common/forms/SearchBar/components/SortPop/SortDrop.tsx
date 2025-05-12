/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import ResCounterAPI from "@/components/elements/ResCounterAPI";
import { tailwindBreak } from "@/core/config/breakpoints";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { FC, useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";

type PropsType = {
  res: any;
} & SearchCtxValsConsumer;

const SortDrop: FC<PropsType> = ({ res, setBar }) => {
  const [labelDrop, setLabelDrop] = useState(
    window.innerWidth > tailwindBreak.sm
  );

  useEffect(() => {
    const handleLabel = () =>
      setLabelDrop(window.innerWidth > tailwindBreak.sm);

    window.addEventListener("resize", handleLabel);
    return () => {
      window.removeEventListener("resize", handleLabel);
    };
  }, []);

  const { data } = res;
  const { nHits } = data ?? {};

  return (
    <div className="w-full flex justify-between gap-8 items-center">
      {res?.isFetching || res?.isError ? (
        <div className=""></div>
      ) : (
        <ResCounterAPI {...{ nHits }} />
      )}

      <div className="w-full max-w-[250px] relative flex justify-end">
        <div
          className="w-full"
          style={{
            maxWidth: labelDrop ? "200px" : "75px",
          }}
        >
          <ButtonIcon
            {...{
              handleClick: () => setBar({ el: "sortBar", val: true }),
              el: {
                icon: FaSort,
                label: labelDrop ? "Sort By" : null,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SortDrop;
