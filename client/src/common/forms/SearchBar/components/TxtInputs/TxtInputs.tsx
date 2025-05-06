import { FC } from "react";
import DropInputs from "./DropInputs";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaSearchMinus } from "react-icons/fa";
import { BtnAct, FormFieldBasic } from "@/types/types";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { useFormContext } from "react-hook-form";
import BtnsSearch from "./BtnsSearch";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  txtInputs: FormFieldBasic[];
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const TxtInputs: FC<PropsType> = ({ txtInputs }) => {
  const { activeTxtInputs, setTxtInputs } = useSearchCtx();

  const {
    register,
    formState: { errors },
    setValue,
    setFocus,
  } = useFormContext();

  return (
    <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
      {activeTxtInputs.map((el) => (
        <div key={el.id} className="w-full flex gap-5 sm:gap-10">
          <FormField
            {...{
              el,
              showLabel: false,
              register,
              errors,
              customStyle: "input__lg",
            }}
          />

          <div className="w-full max-w-[75px]">
            <ButtonIcon
              {...{
                el: removeFieldBtn,
                act: BtnAct.DEL,
                handleClick: () => {
                  setValue(el.field, "");
                  setTxtInputs(
                    activeTxtInputs.filter((val) => val.field !== el.field)
                  );
                },
              }}
            />
          </div>
        </div>
      ))}

      <div className="w-full search_bar__btns gap-y-5 gap-x-10">
        <div className="w-full search_bar__add">
          <DropInputs {...{ txtInputs, setFocus }} />
        </div>

        <BtnsSearch />
      </div>
    </div>
  );
};

export default TxtInputs;
