/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import { BtnAct, FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { makeDelay } from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import DropInputs from "./components/DropInputs";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import s from "./ButtonsForm.module.css";
import { useClickSearch } from "@/features/common/SearchBar/hooks/useClickSearch";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

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
          <Button
            {...{
              label: "Search",
              styleTxt: s.txt,
              type: "submit",
              act: BtnAct.DO,
              Icon: FaSearch,
              isPending: isPending.submit,
              isDisabled: res?.isFetching || hasFormErrs,
            }}
          />
        </div>
        <div
          className={`${s.btn_main} w-full  sm:justify-self-center justify-self-end`}
        >
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
    </div>
  );
};

export default ButtonsForm;
