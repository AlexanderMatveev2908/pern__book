/* eslint-disable @typescript-eslint/no-explicit-any */
import CloseBtn from "@/components/elements/buttons/CloseBtn";
import Title from "@/components/elements/Title";
import { useAnimatePop } from "@/core/hooks/all/UI/useAnimatePop";
import { SorterSearch, TriggerRTK } from "@/types/types";
import { useCallback, useEffect, useRef, type FC } from "react";
import PairSort from "./components/PairSort";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useFormContext } from "react-hook-form";
import { cpyObj, getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { useGetSearchKeysStorage } from "@/features/common/SearchBar/hooks/useGetSearchKeysStorage";

type PropsType = {
  sorters?: SorterSearch[];
  triggerRtk: TriggerRTK[0];
  routeID?: string;
};

const SortPop: FC<PropsType> = ({ sorters, triggerRtk, routeID }) => {
  const popRef = useRef<HTMLDivElement | null>(null);
  const {
    setBar,
    bars: { sortBar },
    updateValsNoDebounce,
    setPagination,
    oldVals,
  } = useSearchCtx();
  const { setValue, getValues } = useFormContext();

  useAnimatePop({
    isPopup: sortBar,
    popRef,
  });

  useEffect(() => {
    const listen = (e: MouseEvent) => {
      if (!popRef.current || !sortBar) return;

      if (!popRef.current.contains(e.target as Node))
        setBar({ el: "sortBar", val: false });
    };

    document.addEventListener("mousedown", listen);

    return () => {
      document.removeEventListener("mousedown", listen);
    };
  }, [setBar, sortBar]);

  const { keyStorage } = useGetSearchKeysStorage();

  const handleClick = useCallback(
    (val: string, el: SorterSearch) => {
      // const obj = {
      //   ASC: "DESC",
      //   DESC: "ASC",
      // };

      // const currVal = getValues(el.field);

      // const updatedVal = obj[currVal as "ASC" | "DESC"] || val;

      const currVal = getValues(el.field);
      const updatedVal = currVal === val ? "" : val;

      const allUpdatedVals = {
        ...cpyObj(getValues()),
        [el.field]: updatedVal,
        ...getDefValsPagination(0),
      };

      updateValsNoDebounce({
        triggerRtk: triggerRtk as any,
        vals: allUpdatedVals,
        routeID,
      });

      oldVals.current = allUpdatedVals;
      saveStorage({
        key: keyStorage as any,
        data: allUpdatedVals,
      });

      setPagination({ el: "page", val: 0 });

      setValue(el.field, updatedVal, { shouldValidate: true });
    },
    [
      getValues,
      setValue,
      triggerRtk,
      updateValsNoDebounce,
      setPagination,
      routeID,
      oldVals,
      keyStorage,
    ]
  );

  return (
    <div
      ref={popRef}
      className={`z__popup popup fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[600px] max-h-[500px] border-[3px] border-blue-600 rounded-xl min-h-[200px] bg-neutral-950 h-full flex flex-col overflow-hidden ${
        sortBar ? "pointer-events-auto" : "pointer-events-none"
      } ${typeof sortBar === "object" ? "opacity-0" : ""} `}
    >
      <div className="w-full justify-between sticky top-0 left-0 z-50 bg-neutral-950  py-2 pb-3 border-b-[3px] border-blue-600 px-10">
        <Title {...{ title: "sorters" }} />

        <CloseBtn
          {...{ handleClick: () => setBar({ el: "sortBar", val: false }) }}
        />
      </div>

      <div className="overflow-y-auto scroll_y scroll_app  w-full h-fit max-h-full flex-1 grid grid-cols-1 py-4 pb-8 items-start gap-5">
        {(sorters ?? []).map((el) => (
          <PairSort key={el.id} {...{ el, handleClick }} />
        ))}
      </div>
    </div>
  );
};

export default SortPop;
