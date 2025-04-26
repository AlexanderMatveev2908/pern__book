/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import ErrorFormField from "./ErrorFormField";
import { FormBaseProps, FormFieldBasic } from "../../../../types/types.ts";
import { capt } from "@/lib/lib.ts";

type PropsType = {
  el: FormFieldBasic;
  customStyle?: string;
} & FormBaseProps;

const WrapperInput: FC<PropsType> = ({ register, errors, el, customStyle }) => {
  return (
    <div className="w-full relative">
      <input
        type={el.type ?? "text"}
        placeholder={el?.place ?? `Your ${el?.label ?? capt(el.field)}...`}
        className={`${customStyle ?? "input__base"} txt__2`}
        {...register(el.field)}
      />
      <ErrorFormField {...{ errors, el }} />
    </div>
  );
};
export default WrapperInput;
