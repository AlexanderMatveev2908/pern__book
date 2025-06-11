/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { BtnAct, FormFieldBasic } from "@/types/types";
import { useMemo, type FC } from "react";
import s from "./BtnResults.module.css";
import { useClickSearch } from "@/features/common/SearchBar/hooks/useClickSearch";
import { useFormContext } from "react-hook-form";
import { MdClear } from "react-icons/md";
import Button from "@/components/elements/buttons/Button/Button";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  res: any;
  txtInputs?: FormFieldBasic[];
  triggerRtk: any;
  routeID?: string;
  defVals?: any;
  innerJoinCat?: boolean;
};

const BtnResults: FC<PropsType> = ({
  res,
  triggerRtk,
  defVals,
  routeID,
  txtInputs,
  innerJoinCat,
}) => {
  const { data: { nHits = 0 } = {} } = res ?? {};
  const ctx = useSearchCtx();
  const {
    isPending,
    preSubmit: { hasFormErrs },
  } = ctx;
  const formCtx = useFormContext();

  const labelTxt = useMemo(
    () => `${nHits} Result${!nHits || nHits > 1 ? "s" : ""}`,
    [nHits]
  );

  const { handleClear } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
    triggerRtk,
    routeID,
    defVals,
    innerJoinCat,
  });

  return (
    <div className="p-3 border-t-[3px] h-[75px] border-blue-600 absolute bottom-0 left-0 w-full z-60 bg-neutral-950 items-center grid grid-cols-2 justify-items-center">
      <div className={`${s.btn_secondary} w-full `}>
        <Button
          {...{
            label: labelTxt ?? "Search",
            styleTxt: s.txt,
            type: "submit",
            act: BtnAct.DO,
            Icon: FaSearch,
            isPending: isPending.submit,
            isDisabled: res?.isFetching || hasFormErrs,
          }}
        />
      </div>
      <div className={`${s.btn_secondary} w-full `}>
        <Button
          {...{
            label: "Clear",
            styleTxt: s.txt,
            type: "button",
            act: BtnAct.DEL,
            Icon: MdClear,
            handleClick: handleClear,
            isPending: isPending?.clear,
            isDisabled: res?.isFetching,
          }}
        />
      </div>
    </div>
  );
};

export default BtnResults;
