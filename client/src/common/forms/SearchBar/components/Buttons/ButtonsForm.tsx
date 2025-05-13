/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import { FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { UseFormReturn } from "react-hook-form";
import { getSizeSearchbarBtns, makeDelay } from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { useClickSearch } from "@/core/hooks/all/forms/searchBar/useClickSearch";
import CLearBtn from "./components/CLearBtn";
import DropInputs from "../TxtInputs/DropInputs";
import SearchBtn from "./components/SearchBtn";

type PropsType = {
  txtInputs: FormFieldBasic[];
  numericFilters?: NumericFilterSearch[];
  ctx: SearchCtxValsConsumer;
  formCtx: UseFormReturn<any>;
  res: any;
};

const ButtonsForm: FC<PropsType> = ({ txtInputs, ctx, formCtx, res }) => {
  const {
    setBar,
    labels: { labelSubmit },
    isPending,
    setSearch,
    preSubmit: { errNumbers, hasFormErrs },
  } = ctx;
  const {
    formState: { errors },
    setFocus,
  } = formCtx;

  const { handleClear, handleSearch } = useClickSearch({
    ctx,
    formCtx,
    txtInputs,
  });

  return (
    <div className="w-full grid grid-cols-1 h-fit items-start gap-y-5 gap-x-10 search_bar__btns">
      <div className="w-full grid grid-cols-2 lg:grid-cols-[1fr_75px] gap-x-10 items-center search_bar_btns_right">
        <div
          className={`w-full justify-self-center relative ${getSizeSearchbarBtns(
            labelSubmit
          )}`}
        >
          <ButtonIcon
            {...{
              handleClick: () => {
                setBar({ val: true, el: "filterBar" });
                if (errNumbers !== null) {
                  setSearch({ el: "currFilter", val: errNumbers.currArr });
                  makeDelay(() => setFocus(errNumbers.currEl.field), 0);
                }
              },
              el: {
                icon: IoFilter,
                label: labelSubmit ? "Filter" : null,
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
        <div
          className={`w-full justify-self-center  ${getSizeSearchbarBtns(
            labelSubmit
          )}`}
        >
          <SearchBtn
            {...{
              hasFormErrs,
              isPending: isPending.submit,
              labelSize: labelSubmit,
              isFetching: res?.isFetching,
              handleSearch,
            }}
          />
        </div>
        <div
          className={`w-full ${getSizeSearchbarBtns(labelSubmit)} ${
            labelSubmit ? "justify-self-center" : "justify-self-end"
          }`}
        >
          <CLearBtn
            {...{
              isFetching: res?.isFetching,
              handleClear,
              isPending: isPending.clear,
              labelSize: labelSubmit,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
