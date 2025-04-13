/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ErrorFormField from "./ErrorFormField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormFieldBasic } from "../../../../types/generalFields";

type PropsType = {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  el: FormFieldBasic;
  customSTyle?: string;
};

const WrapperInput: FC<PropsType> = ({ register, errors, el, customSTyle }) => {
  return (
    <div className="w-full relative">
      <input
        type={el.type ?? "text"}
        placeholder={el.place ?? `Your ${el.label}...`}
        className={`${customSTyle ?? "input__base"} txt__2`}
        {...register(el.field)}
      />
      <ErrorFormField {...{ errors, el }} />
    </div>
  );
};
export default WrapperInput;
