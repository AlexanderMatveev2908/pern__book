import { FC, ReactNode } from "react";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaSearchMinus } from "react-icons/fa";
import { BtnAct, StorageKeys } from "@/types/types";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { useFormContext } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { saveStorage } from "@/core/lib/lib";

type PropsType = {
  children: ReactNode;
  keyStorageLabels: StorageKeys;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const TxtInputs: FC<PropsType> = ({ children, keyStorageLabels }) => {
  const { activeTxtInputs, setTxtInputs } = useSearchCtx();

  const {
    register,
    formState: { errors },
    setValue,
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
              styleContErr: { top: "-75%", right: "-0%" },
            }}
          />

          <div className="w-full max-w-[75px]">
            <ButtonIcon
              {...{
                el: removeFieldBtn,
                act: BtnAct.DEL,
                handleClick: () => {
                  setValue(el.field, "");
                  const filtered = activeTxtInputs.filter(
                    (val) => val.field !== el.field
                  );
                  setTxtInputs(filtered);
                  saveStorage({ key: keyStorageLabels, data: filtered });
                },
              }}
            />
          </div>
        </div>
      ))}

      {children}
    </div>
  );
};

export default TxtInputs;
