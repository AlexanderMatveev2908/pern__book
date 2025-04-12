/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { FormFieldBasic } from "../../../../types/generalFields";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useSavePrevErr } from "../../../../hooks/useSavePrevErr";
import "./PwdField.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./PwdField.css";

type PropsType = {
  el: FormFieldBasic;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isPwd: boolean;
  handleClick: () => void;
};

const PwdField: FC<PropsType> = ({
  el,
  register,
  errors,
  isPwd,
  handleClick,
}) => {
  const { prevErr } = useSavePrevErr(errors, el.field);

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
        </div>

        <div
          className={`absolute top-1/6 right-0 transition-all duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-60 pointer-events-none ${
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
export default PwdField;
