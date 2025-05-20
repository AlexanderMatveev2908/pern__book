/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import ResCounterAPI from "@/components/elements/ResCounterAPI";
import { ParamsBar } from "@/core/contexts/SearchCtx/reducer/actions";
import { FC } from "react";
import { FaSort } from "react-icons/fa";

type PropsType = {
  res: any;
  setBar: (vals: ParamsBar) => void;
};

const SortDrop: FC<PropsType> = ({ res, setBar }) => {
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
        <div className="w-full max-w-[75px] sm:max-w-[200px]">
          <ButtonIcon
            {...{
              styleTxt: "search_bar__btn__txt_secondary",
              handleClick: () => setBar({ el: "sortBar", val: true }),
              el: {
                icon: FaSort,
                label: "Sort By",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SortDrop;
