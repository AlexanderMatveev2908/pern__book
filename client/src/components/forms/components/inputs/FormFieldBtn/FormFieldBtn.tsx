/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt, makeDelay } from "@/lib/lib";
import { FormFieldBasic, UserType } from "@/types/types";
import { Pencil, PenOff } from "lucide-react";
import { FC, useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetFocus,
  UseFormSetValue,
} from "react-hook-form";
import "./FormFieldBtn.css";

type PropsType = {
  user?: UserType;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setFocus: UseFormSetFocus<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  el: FormFieldBasic;
};

const FormFieldBtn: FC<PropsType> = ({
  register,
  errors,
  user,
  setFocus,
  setValue,
  clearErrors,
  el,
}) => {
  const [isInput, setIsInput] = useState(false);
  const [prevErr, setPrevErr] = useState<string | null>(null);

  useEffect(() => {
    if (errors?.[el.field]?.message && !prevErr)
      setPrevErr(errors?.[el.field]?.message as string);
  }, [errors, el.field, prevErr]);

  return (
    <div className="w-full h-fit flex items-center gap-5">
      <label className="w-full h-fit flex items-center relative">
        <input
          type={el?.type ?? "text"}
          disabled={!isInput}
          placeholder={el?.place ?? `Your ${capt(el.field)}...`}
          className={`w-full appearance-none el__flow outline-0 py-2 px-3 rounded-xl border-2  el__focus txt__2 border-blue-600 ${
            isInput ? "" : "opacity-75"
          }`}
          {...register(el.field)}
        />
        <div
          className={`absolute -top-full right-0 l w-fit transition-all duration-500 pointer-events-none ${
            errors[el.field]?.message
              ? "translate-y-0 opacity-100"
              : "translate-y-[50px] opacity-0"
          }`}
        >
          <div className="bg-[#000] py-1 px-3 border-2 border-red-600 rounded-xl z-60 relative h-fit">
            <span className="txt__1 text-red-600">
              {(errors?.[el.field]?.message as string) || prevErr}
            </span>

            <div className="absolute w-[30px] h-[30px] right-[25px] top-[128%] -translate-y-1/2 overflow-hidden z-60">
              <div className="w-[30px] h-[30px] border-2 border-red-600 bg-[#000] rotate-45 absolute top-[-15px] left-0"></div>
            </div>
          </div>
        </div>
      </label>

      <button
        type="button"
        onClick={() => {
          setIsInput(!isInput);

          if (!isInput) makeDelay(() => setFocus(el.field), 0);

          if (isInput && user?.[el.field as keyof UserType] !== undefined)
            setValue(el.field, user?.[el.field as keyof UserType] ?? "");

          if (errors?.[el.field]?.message) clearErrors(el.field);
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
