/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import { FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { makeDelay } from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { useClickSearch } from "@/core/hooks/all/forms/searchBar/useClickSearch";
import DropInputs from "../TxtInputs/DropInputs";
import SearchBtn from "./components/SearchBtn";
import CLearBtn from "./components/ClearBtn";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  txtInputs?: FormFieldBasic[];
  numericFilters?: NumericFilterSearch[];
  res: any;
  trigger: any;
};

const ButtonsForm: FC<PropsType> = ({ txtInputs, trigger, res }) => {
  const ctx = useSearchCtx();
  const {
    setBar,
    isPending,
    setSearch,
    preSubmit: { errNumbers, hasFormErrs },
  } = ctx;
  const formCtx = useFormContext();
  const {
    formState: { errors },
    setFocus,
  } = formCtx;

  const { handleClear, handleSearch } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
    trigger,
  });

  return (
    <div className="w-full grid grid-cols-1 h-fit items-start gap-y-5 gap-x-10 left_btns">
      <div className="w-full grid grid-cols-2 lg:grid-cols-[1fr_75px] gap-x-10 items-center right_btns">
        <div className={`w-full justify-self-center relative  btn_main`}>
          <ButtonIcon
            {...{
              handleClick: () => {
                setBar({ val: true, el: "filterBar" });
                if (errNumbers !== null) {
                  setSearch({ el: "currFilter", val: errNumbers.currArr });

                  makeDelay(() => setFocus(errNumbers.currEl.field), 0);
                }
              },
              styleTxt: "txt",
              el: {
                icon: IoFilter,
                label: "Filter",
              },
            }}
          />

          <ErrorFormField {...{ errors, el: errNumbers?.currEl }} />
        </div>

        <div className="w-full">
          <DropInputs {...{ txtInputs }} />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-x-10 items-center">
        <div className={`w-full justify-self-center btn_main`}>
          <SearchBtn
            {...{
              hasFormErrs,
              isPending: isPending.submit,
              isFetching: res?.isFetching,
              handleSearch,
              styleTxt: "txt",
            }}
          />
        </div>
        <div
          className={`w-full btn_main  sm:justify-self-center   justify-self-end`}
        >
          <CLearBtn
            {...{
              isFetching: res?.isFetching,
              handleClear,
              isPending: isPending.clear,
              styleTxt: "txt",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
