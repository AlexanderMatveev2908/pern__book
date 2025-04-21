/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt, makeDelay } from "@/lib/lib";
import { FormFieldBasic } from "@/types/types";
import { Pencil, PenOff } from "lucide-react";
import { FC, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetFocus } from "react-hook-form";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setFocus: UseFormSetFocus<any>;
  el: FormFieldBasic;
};

const FormFieldBtn: FC<PropsType> = ({ register, errors, setFocus, el }) => {
  const [isInput, setIsInput] = useState(false);

  return (
    <div className="w-full h-fit flex items-center gap-5">
      <label className="w-full h-fit flex items-center">
        <input
          type={el?.type ?? "text"}
          disabled={!isInput}
          placeholder={el?.place ?? `Your ${capt(el.field)}...`}
          className={`w-full appearance-none el__flow outline-0 py-2 px-3 rounded-xl border-2  el__focus txt__2 border-blue-600 ${
            isInput ? "" : "opacity-75"
          }`}
          {...register(el.field)}
        />
      </label>

      <button
        type="button"
        onClick={() => {
          setIsInput(!isInput);
          if (!isInput) makeDelay(() => setFocus(el.field), 0);
        }}
        className="appearance-none outline-0 rounded-xl btn__logic_sm cursor-pointer group"
      >
        {isInput ? (
          <PenOff className="icon__sm el__flow group-hover:text-blue-600" />
        ) : (
          <Pencil className="icon__sm el__flow group-hover:text-blue-600" />
        )}
      </button>
    </div>
  );
};
export default FormFieldBtn;
