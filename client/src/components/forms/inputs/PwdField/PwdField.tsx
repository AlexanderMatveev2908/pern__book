/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorFormField from "../../Errors/ErrorFormField.tsx";
import { FormFieldBasic } from "@/types/types.ts";
import { Control, Controller, FieldErrors } from "react-hook-form";
import s from "./PwdField.module.css";

type PropsType = {
  el: FormFieldBasic;
  isPwd: boolean;
  handleClick: () => void;
  setFocus?: (val: boolean) => void;
  errors: FieldErrors;
  control: Control<any>;
  customCB?: (val: any) => void;
};

const PwdField: FC<PropsType> = ({
  el,
  control,
  errors,
  isPwd,
  handleClick,
  setFocus,
  customCB,
}) => {
  return (
    <div className="w-full grid pwd_field">
      <label className="grid w-full gap-2 relative">
        <span className="txt__2">{el.label}</span>

        <div className="w-full flex relative">
          <Controller
            name={el.field}
            control={control}
            render={({ field }) => (
              <input
                ref={field.ref}
                type={isPwd ? "password" : "text"}
                placeholder={el.place ?? `Your ${el.label}...`}
                className="input__md txt__2"
                onFocus={() => setFocus?.(true)}
                onBlur={() => {
                  setFocus?.(false);
                }}
                autoComplete="off"
                value={field.value ?? ""}
                onChange={(e) => {
                  field.onChange(e);

                  customCB?.(e.target.value);
                }}
              />
            )}
          />

          <button
            onClick={handleClick}
            type="button"
            className={`${s.btn} absolute top-1/2 -translate-y-1/2 right-[20px] `}
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
