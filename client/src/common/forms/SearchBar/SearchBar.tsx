import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsSearchStore } from "@/core/config/fieldsData/SearchBar/general";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import ArrInputs from "./ArrInputs";
import { FaSearchMinus } from "react-icons/fa";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { BtnAct, FormFieldBasic } from "@/types/types";
import Button from "@/components/elements/buttons/Button/Button";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const SearchBar: FC<PropsType> = ({ handleSave }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [fieldsActive, setFieldsActive] = useState<FormFieldBasic[]>([
    fieldsSearchStore[0],
  ]);

  return (
    <form
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4 "
    >
      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
        {fieldsActive.map((el) => (
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
                  act: BtnAct.DEL,
                  handleClick: () => {
                    setValue(el.field, "");
                    setFieldsActive((prev) =>
                      prev.filter((val) => val.field !== el.field)
                    );
                  },
                }}
              />
            </div>
          </div>
        ))}

        <ArrInputs {...{ fieldsActive, setFieldsActive }} />
      </div>

      <div className="w-full max-w-[250px] justify-self-center mt-5">
        <Button
          {...{
            label: "Search",
            isDisabled: false,
            type: "submit",
          }}
        />
      </div>
    </form>
  );
};

export default SearchBar;
