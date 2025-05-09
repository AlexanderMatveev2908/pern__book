import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC, useMemo } from "react";
import DropInputs from "./TxtInputs/DropInputs";
import { BtnAct, FormFieldBasic, NumericFilterSearch } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { getSizeSearchbarBtns, makeDelay, saveStorage } from "@/core/lib/lib";
import ErrorFormField from "@/components/forms/Errors/ErrorFormField";
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { useGetSearchKeysStorage } from "@/core/hooks/all/useGetSearchKeysStorage";

type PropsType = {
  txtInputs: FormFieldBasic[];
  isFetching: boolean;
  numericFilters?: NumericFilterSearch[];
};

const ButtonsForm: FC<PropsType> = ({
  txtInputs,
  isFetching,
  numericFilters,
}) => {
  const {
    setBar,
    labels: { labelSubmit },
    setTxtInputs,
    isPending,
    setIsPending,
    isBtnDisabled,
    setSearch,
    setPagination,
  } = useSearchCtx();
  const {
    reset,
    formState: { errors },
    watch,
    setFocus,
  } = useFormContext();

  const vals = watch();

  const errEl = useMemo(
    () => getErrFooterBar({ errs: errors, numericFilters }),
    // eslint-disable-next-line
    [numericFilters, errors, vals]
  );

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
                if (errEl !== null) {
                  setSearch({ el: "currFilter", val: errEl.currArr });
                  makeDelay(() => setFocus(errEl.currEl.field), 0);
                }
              },
              el: {
                icon: IoFilter,
                label: labelSubmit ? "Filter" : null,
              },
            }}
          />

          {errEl && <ErrorFormField {...{ errors, el: errEl?.currArr }} />}
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
              isDisabled: isFetching || isBtnDisabled,
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
                setIsPending({ el: "clear", val: true });

                reset({});
                setTxtInputs([txtInputs[0]]);

                setPagination({ el: "block", val: 0 });
                setPagination({ el: "page", val: 0 });

                saveStorage({ data: {}, key: keyStorageVals });
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
