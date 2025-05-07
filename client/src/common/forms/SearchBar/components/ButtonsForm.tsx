/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import DropInputs from "./TxtInputs/DropInputs";
import { BtnAct, FormFieldBasic, StorageKeys } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { useFormContext, UseFormSetFocus } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { delKeyStorage, getSizeSearchbarBtns } from "@/core/lib/lib";

type PropsType = {
  txtInputs: FormFieldBasic[];
  setFocus: UseFormSetFocus<any>;
  keyStorage: StorageKeys;
};

const ButtonsForm: FC<PropsType> = ({ txtInputs, setFocus, keyStorage }) => {
  const {
    setBar,
    labels: { labelSubmit },
  } = useSearchCtx();
  const { reset } = useFormContext();

  return (
    <div className="w-full grid grid-cols-1 h-fit items-start gap-y-5 gap-x-10 search_bar__btns">
      <div className="w-full grid grid-cols-2 lg:grid-cols-[1fr_75px] gap-x-10 items-center search_bar_btns_right">
        <div
          className={`w-full justify-self-center ${getSizeSearchbarBtns(
            labelSubmit
          )}`}
        >
          <ButtonIcon
            {...{
              handleClick: () => setBar({ val: true, el: "filterBar" }),
              el: {
                icon: IoFilter,
                label: labelSubmit ? "Filter" : null,
              },
            }}
          />
        </div>

        <div className="w-full">
          <DropInputs {...{ txtInputs, setFocus }} />
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
                reset({ _: Date.now() });
                delKeyStorage(keyStorage);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
