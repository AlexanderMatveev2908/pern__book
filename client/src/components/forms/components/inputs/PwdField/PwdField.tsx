/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FormFieldBasic } from "../../../../../types/types.ts";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import "./PwdField.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./PwdField.css";
import ErrorFormField from "../ErrorFormField";

type PropsType = {
  el: FormFieldBasic;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isPwd: boolean;
  handleClick: () => void;
  setFocus?: (val: boolean) => void;
};

const PwdField: FC<PropsType> = ({
  el,
  register,
  errors,
  isPwd,
  handleClick,
  setFocus,
}) => {
  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        <span className="txt__2">{el.label}</span>

        <div className="w-full flex relative">
          <input
            type={isPwd ? "password" : "text"}
            placeholder={el.place ?? `Your ${el.label}...`}
            className="input__icon txt__2"
            {...register(el.field)}
            onFocus={() => setFocus?.(true)}
            onBlur={() => {
              setFocus?.(false);
            }}
            autoComplete="off"
          />

          <button
            onClick={handleClick}
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-[20px] btn__pwd"
          >
            {isPwd ? (
              <IoMdEyeOff className="icon__sm" />
            ) : (
              <IoMdEye className="icon__sm" />
            )}
          </button>
          <ErrorFormField {...{ errors, el }} />
        </div>
      </label>
    </div>
  );
};
export default PwdField;
