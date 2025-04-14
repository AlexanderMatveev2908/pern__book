/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FormFieldBasic } from "../../../../types/types.ts";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import WrapperInput from "./WrapperInput";

type PropsType = {
  el: FormFieldBasic;
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

const FormField: FC<PropsType> = ({ el, register, errors }) => {
  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        <span className="txt__2">{el.label}</span>

        <WrapperInput {...{ el, register, errors }} />
      </label>
    </div>
  );
};
export default FormField;
