/* eslint-disable @typescript-eslint/no-explicit-any */
import { capt, makeDelay } from "@/core/lib/lib";
import {
  FormBaseProps,
  FormFieldBasic,
  FormSettersProps,
  UserType,
} from "@/types/types";
import { Pencil, PenOff } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { UseFormClearErrors, UseFormSetFocus } from "react-hook-form";
import "./FormFieldBtn.css";
import ErrorFormField from "../../Errors/ErrorFormField";

type PropsType = {
  user?: UserType;
  setFocus: UseFormSetFocus<any>;
  clearErrors: UseFormClearErrors<any>;
  el: FormFieldBasic;
  eventCloseInput?: boolean;
  setEventClose?: (val: boolean) => void;
} & FormBaseProps &
  Omit<FormSettersProps, "watch">;

const FormFieldBtn: FC<PropsType> = ({
  register,
  errors,
  user,
  setFocus,
  setValue,
  clearErrors,
  eventCloseInput,
  setEventClose,
  el,
}) => {
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    if (eventCloseInput) {
      setIsInput(false);
      setEventClose?.(false);
    }
  }, [eventCloseInput, setEventClose]);

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

        <ErrorFormField {...{ errors, el }} />
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
