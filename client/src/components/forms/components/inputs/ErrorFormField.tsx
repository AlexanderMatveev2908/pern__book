import { FC } from "react";
import { FieldErrors } from "react-hook-form";
import { FormFieldBasic } from "../../../../types/types.ts";
import { useSavePrevErr } from "../../../../hooks/all/forms/useSavePrevErr";

type PropsType = {
  errors: FieldErrors;
  el: FormFieldBasic;
  styleCont?: string;
  styleTool?: string;
};

const ErrorFormField: FC<PropsType> = ({
  errors,
  el,
  styleCont,
  styleTool,
}) => {
  const { prevErr } = useSavePrevErr(errors, el.field);

  return (
    <div
      className={`absolute ${
        styleCont ?? "-top-[100%] right-0"
      }  transition-all pointer-events-none duration-[0.4s] text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] z-40 ${
        errors[el.field]?.message
          ? "translate-y-0 opacity-100"
          : "translate-y-[200%] opacity-0"
      }`}
    >
      <span className="txt__1 text-red-600">
        {(errors?.[el.field]?.message as string) || prevErr}
      </span>

      <div
        className={`absolute w-[30px] h-[30px] right-[25px] -translate-y-1/2 overflow-hidden z-60 ${
          styleTool ?? "top-[128%]"
        }`}
      >
        <div className="w-[30px] h-[30px] border-2 border-red-600 bg-[#000] rotate-45 absolute top-[-15px] left-0"></div>
      </div>
    </div>
  );
};
export default ErrorFormField;
