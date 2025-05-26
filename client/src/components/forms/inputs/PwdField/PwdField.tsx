import { FC } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorFormField from "../../Errors/ErrorFormField.tsx";
import { FormBaseProps, FormFieldBasic } from "@/types/types.ts";

type PropsType = {
  el: FormFieldBasic;
  isPwd: boolean;
  handleClick: () => void;
  setFocus?: (val: boolean) => void;
} & FormBaseProps;

const PwdField: FC<PropsType> = ({
  el,
  register,
  errors,
  isPwd,
  handleClick,
  setFocus,
}) => {
  return (
    <div className="w-full grid pwd_field">
      <label className="grid w-full gap-2 relative">
        <span className="txt__2">{el.label}</span>

        <div className="w-full flex relative">
          <input
            type={isPwd ? "password" : "text"}
            placeholder={el.place ?? `Your ${el.label}...`}
            className="input__md txt__2"
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
            className="absolute top-1/2 -translate-y-1/2 right-[20px] btn"
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
