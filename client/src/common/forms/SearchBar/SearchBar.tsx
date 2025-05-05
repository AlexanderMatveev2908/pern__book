import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsSearchStore } from "@/core/config/fieldsData/SearchBar/general";
import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ArrInputs from "./components/ArrInputs";
import { FaSearch, FaSearchMinus, FaSort } from "react-icons/fa";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { BtnAct, FormFieldBasic } from "@/types/types";
import Button from "@/components/elements/buttons/Button/Button";
import { IoFilter } from "react-icons/io5";
import { tailwindBreak } from "@/core/config/breakpoints";
import { MdClear } from "react-icons/md";
import "./SearchBar.css";

type PropsType = {
  isLoading?: boolean;
  handleSave: () => void;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const getSize = (label: boolean) => (label ? "max-w-[200px]" : "max-w-[75px]");

const SearchBar: FC<PropsType> = ({ handleSave }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [labelBtns, setLabelBtns] = useState(
    window.innerWidth > tailwindBreak.sm
  );
  const [labelSubmit, setLabelSubmit] = useState(window.innerWidth > 450);

  useEffect(() => {
    const listenSize = () => {
      setLabelBtns(window.innerWidth > tailwindBreak.sm);
      setLabelSubmit(window.innerWidth > 450);
    };

    window.addEventListener("resize", listenSize);
    return () => {
      window.removeEventListener("resize", listenSize);
    };
  }, []);

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
                    setFieldsActive((prev) =>
                      prev.filter((val) => val.field !== el.field)
                    );
                  },
                }}
              />
            </div>
          </div>
        ))}

        <div className="w-full search_bar__btns gap-y-5 gap-x-10">
          <div className="w-full search_bar__add">
            <ArrInputs {...{ fieldsActive, setFieldsActive }} />
          </div>

          <div className="w-full gap-x-10 grid grid-cols-2 gap-y-5">
            <div className={`w-full justify-self-center ${getSize(labelBtns)}`}>
              <ButtonIcon
                {...{
                  handleClick: () => console.log(`dff`),
                  el: {
                    icon: IoFilter,
                    label: labelBtns ? "Filter" : null,
                  },
                }}
              />
            </div>

            <div className={`w-full justify-self-center ${getSize(labelBtns)}`}>
              <ButtonIcon
                {...{
                  handleClick: () => console.log(`ddd`),
                  el: {
                    icon: FaSort,
                    label: labelBtns ? "Sort" : null,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 search_bar__submit gap-x-10 items-center justify-items-center">
        <div
          className={`w-full items-center justify-self-center mt-5 ${getSize(
            labelSubmit
          )}`}
        >
          <Button
            {...{
              label: labelSubmit ? "Search" : null,
              isDisabled: false,
              type: "submit",
              act: BtnAct.DO,
              Icon: FaSearch,
            }}
          />
        </div>
        <div
          className={`w-full items-center justify-self-center mt-5 ${getSize(
            labelSubmit
          )}`}
        >
          <Button
            {...{
              label: labelSubmit ? "Clear" : null,
              isDisabled: false,
              type: "button",
              act: BtnAct.DEL,
              Icon: MdClear,
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
