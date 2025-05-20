/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useClickSearch } from "@/core/hooks/all/forms/searchBar/useClickSearch";
import { FormFieldBasic } from "@/types/types";
import { useMemo, type FC } from "react";
import { useFormContext } from "react-hook-form";
import SearchBtn from "../../Buttons/components/SearchBtn";
import CLearBtn from "../../Buttons/components/ClearBtn";

type PropsType = {
  res: any;
  txtInputs: FormFieldBasic[];
  trigger: any;
};

const BtnResults: FC<PropsType> = ({ res, trigger, txtInputs }) => {
  const { data: { nHits = 0 } = {} } = res ?? {};
  const ctx = useSearchCtx();
  const {
    isPending,
    preSubmit: { hasFormErrs },
  } = ctx;
  const formCtx = useFormContext();
  const { handleSearch, handleClear } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
    trigger,
  });

  const labelTxt = useMemo(
    () => `${nHits} Result${!nHits || nHits > 1 ? "s" : ""}`,
    [nHits]
  );

  return (
    <div className="p-3 border-t-[3px] h-[75px] border-blue-600 absolute bottom-0 left-0 w-full z-60 bg-neutral-950 items-center grid grid-cols-2 justify-items-center">
      <div className={`w-full search_bar__btn__search__secondary`}>
        <SearchBtn
          {...{
            isPending: isPending.submit,
            handleSearch,
            hasFormErrs,
            labelTxt,
            styleTxt: "search_bar__btn__txt_secondary",
            isFetching: res?.isFetching,
          }}
        />
      </div>
      <div className={`w-full search_bar__btn__search__secondary`}>
        <CLearBtn
          {...{
            handleClear,
            isPending: isPending.clear,
            styleTxt: "search_bar__btn__txt_secondary",
            isFetching: res?.isFetching,
          }}
        />
      </div>
    </div>
  );
};

export default BtnResults;
