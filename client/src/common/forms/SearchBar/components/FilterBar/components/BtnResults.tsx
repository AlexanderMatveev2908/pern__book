/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useClickSearch } from "@/core/hooks/all/forms/searchBar/useClickSearch";
import { FormFieldBasic } from "@/types/types";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import CLearBtn from "../../Buttons/components/CLearBtn";
import SearchBtn from "../../Buttons/components/SearchBtn";

type PropsType = {
  res: any;
  txtInputs: FormFieldBasic[];
};

const BtnResults: FC<PropsType> = ({ res, txtInputs }) => {
  const { data } = res ?? {};
  const ctx = useSearchCtx();
  const {
    isPending,
    labels: { labelSearch },
    preSubmit: { hasFormErrs },
  } = ctx;
  const formCtx = useFormContext();
  const { handleSearch, handleClear } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
  });

  return (
    <div className="p-3 border-t-[3px] h-[75px] border-blue-600 absolute bottom-0 left-0 w-full z-60 bg-neutral-950 items-center grid grid-cols-2 justify-items-center">
      <div
        className={`w-full ${labelSearch ? "max-w-[200px]" : "max-w-[75px]"}`}
      >
        <SearchBtn
          {...{
            isPending: isPending.submit,
            labelSize: labelSearch,
            res,
            handleSearch,
            hasFormErrs,
          }}
        />
      </div>
      <div
        className={`w-full ${labelSearch ? "max-w-[200px]" : "max-w-[75px]"}`}
      >
        <CLearBtn
          {...{
            handleClear,
            isPending: isPending.clear,
            labelSize: labelSearch,
            res,
          }}
        />
      </div>
    </div>
  );
};

export default BtnResults;
