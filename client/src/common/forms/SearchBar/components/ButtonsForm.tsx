import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FC } from "react";
import DropInputs from "./TxtInputs/DropInputs";
import { BtnAct, FormFieldBasic } from "@/types/types";
import { IoFilter } from "react-icons/io5";
import { UseFormSetFocus } from "react-hook-form";
import { getSize } from "../SearchBar";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import Button from "@/components/elements/buttons/Button/Button";
import { MdClear } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

type PropsType = {
  txtInputs: FormFieldBasic[];
  setFocus: UseFormSetFocus<any>;
};

const ButtonsForm: FC<PropsType> = ({ txtInputs, setFocus }) => {
  const {
    setBar,
    labels: { labelSubmit },
  } = useSearchCtx();

  return (
    <div className="w-full grid grid-cols-1 h-fit items-start gap-y-5 gap-x-10 search_bar__btns">
      <div className="w-full grid grid-cols-2 gap-x-10 items-center search_bar_btns_right">
        <div className={`w-full justify-self-center ${getSize(labelSubmit)}`}>
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
        <div className={`w-full justify-self-center  ${getSize(labelSubmit)}`}>
          <Button
            {...{
              label: labelSubmit ? "Search" : null,
              isDisabled: false,
              type: "submit",
              act: BtnAct.DO,
              Icon: FaSearch,
              // isPending: true,
            }}
          />
        </div>
        <div
          className={`w-full ${getSize(labelSubmit)} ${
            labelSubmit ? "justify-self-center" : "justify-self-end"
          }`}
        >
          <Button
            {...{
              label: labelSubmit ? "Clear" : null,
              isDisabled: false,
              type: "button",
              act: BtnAct.DEL,
              Icon: MdClear,
              // isPending: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonsForm;
