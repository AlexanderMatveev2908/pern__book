/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import { FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { makeDelay } from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { useClickSearch } from "@/features/common/SearchBar/hooks/useClickSearch";
import DropInputs from "../TxtInputs/DropInputs";
import SearchBtn from "./components/SearchBtn";
import CLearBtn from "./components/ClearBtn";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import s from "./ButtonsForm.module.css";

type PropsType = {
  txtInputs?: FormFieldBasic[];
  numericFilters?: NumericFilterSearch[];
  res: any;
  triggerRtk: any;
  routeID?: string;
  defVals?: any;
  innerJoinCat?: boolean;
};

const ButtonsForm: FC<PropsType> = ({
  txtInputs,
  routeID,
  triggerRtk,
  res,
  defVals,
  innerJoinCat,
}) => {
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
    <div
      className={`${s.left_btns} w-full grid grid-cols-1 h-fit items-start gap-y-5 gap-x-10 `}
    >
      <div
        className={`${s.right_btns} w-full grid grid-cols-2 lg:grid-cols-[1fr_75px] gap-x-10 items-center `}
      >
        <div className={`${s.btn_main} w-full justify-self-center relative  `}>
          <ButtonIcon
            {...{
              handleClick: () => {
                setBar({ val: true, el: "filterBar" });
                if (errNumbers !== null) {
                  setSearch({ el: "currFilter", val: errNumbers.currArr });

                  makeDelay(() => setFocus(errNumbers.currEl.field), 0);
                }
              },
              styleTxt: s.txt,
              el: {
                icon: IoFilter,
                label: "Filter",
              },
            }}
          />

          <ErrorFormField {...{ errors, el: errNumbers?.currEl }} />
        </div>

        <div className="w-full flex justify-end">
          <DropInputs {...{ txtInputs }} />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-x-10 items-center">
        <div className={`${s.btn_main} w-full justify-self-center `}>
          <SearchBtn
            {...{
              hasFormErrs,
              isPending: isPending.submit,
              isFetching: res?.isFetching,
              styleTxt: s.txt,
            }}
          />
        </div>
        <div
          className={`${s.btn_main} w-full   sm:justify-self-center   justify-self-end`}
        >
          <CLearBtn
            {...{
              isFetching: res?.isFetching,
              handleClear,
              isPending: isPending.clear,
              styleTxt: s.txt,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
