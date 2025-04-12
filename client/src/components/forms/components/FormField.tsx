/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FormFieldBasic } from "../../../types/generalFields";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSavePrevErr } from "../../../hooks/useSavePrevErr";

type PropsType = {
  el: FormFieldBasic;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const FormField: FC<PropsType> = ({ el, register, errors }) => {
  const { prevErr } = useSavePrevErr(errors, el.field);

  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        <span className="txt__2">{el.label}</span>

        <input
          type={el.type ?? "text"}
          placeholder={el.place ?? `Your ${el.label}...`}
          className="input__base txt__2"
          {...register(el.field)}
        />

        <div
          className={`absolute top-1/6 right-0 transition-all pointer-events-none duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-60 ${
            errors[el.field]?.message
              ? "translate-y-0 opacity-100"
              : "translate-y-[200%] opacity-0"
          }`}
        >
          {(errors[el.field]?.message as string) ?? prevErr}
        </div>
      </label>
    </div>
  );
};
export default FormField;
