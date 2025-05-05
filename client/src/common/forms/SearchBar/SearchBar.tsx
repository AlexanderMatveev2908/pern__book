import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsSearchStore } from "@/core/config/fieldsData/SearchBar/general";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import ArrInputs from "./ArrInputs";
import { FaSearchMinus } from "react-icons/fa";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { BtnAct } from "@/types/types";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const SearchBar: FC<PropsType> = ({ isLoading, handleSave }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const [fieldsActive, setFieldsActive] = useState(["name"]);

  return (
    <form className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 ">
      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
        {fieldsSearchStore.map((el) =>
          !fieldsActive.includes(el.field) ? null : (
            <div key={el.id} className="w-full flex gap-10">
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
                    handleClick: () => null,
                    act: BtnAct.DEL,
                  }}
                />
              </div>
            </div>
          )
        )}

        <ArrInputs {...{ fieldsActive, setFieldsActive }} />
      </div>
    </form>
  );
};

export default SearchBar;
