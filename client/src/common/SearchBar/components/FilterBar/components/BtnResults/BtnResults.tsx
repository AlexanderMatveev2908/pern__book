/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FormFieldBasic } from "@/types/types";
import { useMemo, type FC } from "react";
import SearchBtn from "../../../subComponents/SearchBtn";
import CLearBtn from "../../../subComponents/ClearBtn";
import s from "./BtnResults.module.css";

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

  const labelTxt = useMemo(
    () => `${nHits} Result${!nHits || nHits > 1 ? "s" : ""}`,
    [nHits]
  );

  return (
    <div className="p-3 border-t-[3px] h-[75px] border-blue-600 absolute bottom-0 left-0 w-full z-60 bg-neutral-950 items-center grid grid-cols-2 justify-items-center">
      <div className={`${s.btn_secondary} w-full `}>
        <SearchBtn
          {...{
            isPending: isPending.submit,
            hasFormErrs,
            labelTxt,
            styleTxt: s.txt,
            isFetching: res?.isFetching,
          }}
        />
      </div>
      <div className={`${s.btn_secondary} w-full `}>
        <CLearBtn
          {...{
            styleTxt: s.txt,
            res,
            triggerRtk,
            defVals,
            routeID,
            txtInputs,
            innerJoinCat,
          }}
        />
      </div>
    </div>
  );
};

export default BtnResults;
