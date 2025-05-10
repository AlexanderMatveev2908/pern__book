import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import DropInputs from "./TxtInputs/DropInputs";
import { BtnAct, FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import {
  getSizeSearchbarBtns,
  makeDelay,
  saveStorage,
  setLimitCards,
} from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";

type PropsType = {
  txtInputs: FormFieldBasic[];
  isFetching: boolean;
  numericFilters?: NumericFilterSearch[];
};

const ButtonsForm: FC<PropsType> = ({ txtInputs, isFetching }) => {
  const {
    setBar,
    labels: { labelSubmit },
    setTxtInputs,
    isPending,
    setIsPending,
    setSearch,
    preSubmit: { errNumbers, hasFormErrs },
    setArgs,
    setPreSubmit,
  } = useSearchCtx();
  const {
    reset,
    formState: { errors },
    setFocus,
  } = useFormContext();

  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();

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
          <Button
            {...{
              label: labelSubmit ? "Search" : null,
              type: "submit",
              act: BtnAct.DO,
              Icon: FaSearch,
              isPending: isPending.submit,
              isDisabled: isFetching || hasFormErrs,
            }}
          />
        </div>
        <div
          className={`w-full ${getSizeSearchbarBtns(labelSubmit)} ${
            labelSubmit ? "justify-self-center" : "justify-self-end"
          }`}
        >
          <Button
            {...{
              label: labelSubmit ? "Clear" : null,
              type: "button",
              act: BtnAct.DEL,
              Icon: MdClear,
              handleClick: () => {
                setPreSubmit({ el: "canMakeAPI", val: false });
                setIsPending({ el: "clear", val: true });

                const def = {
                  [txtInputs[0].field]: "",
                  limit: setLimitCards(),
                  page: 0,
                  _: Date.now(),
                };

                setArgs(def);
                reset({
                  [txtInputs[0].field]: "",
                });
                setTxtInputs([txtInputs[0]]);

                saveStorage({
                  data: def,
                  key: keyStorageVals,
                });
                saveStorage({ data: [txtInputs[0]], key: keyStorageLabels });
              },
              isPending: isPending.clear,
              isDisabled: isFetching,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
