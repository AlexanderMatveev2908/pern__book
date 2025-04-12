import { FC } from "react";
import { FieldErrors } from "react-hook-form";
import { FormFieldBasic } from "../../../../types/generalFields";
import { useSavePrevErr } from "../../../../hooks/useSavePrevErr";

type PropsType = {
  errors: FieldErrors;
  el: FormFieldBasic;
};

const ErrorFormField: FC<PropsType> = ({ errors, el }) => {
  const { prevErr } = useSavePrevErr(errors, el.field);
  return (
    <div
      className={`absolute top-1/6 right-0 transition-all pointer-events-none duration-300 text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-60 ${
        errors[el.field]?.message
          ? "translate-y-0 opacity-100"
          : "translate-y-[200%] opacity-0"
      }`}
    >
      {(errors[el.field]?.message as string) ?? prevErr}
    </div>
  );
};
export default ErrorFormField;
