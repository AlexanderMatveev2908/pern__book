import { FC } from "react";
import { FormBaseProps, FormFieldBasic } from "../../../../types/types.ts";
import WrapperInput from "./WrapperInput.tsx";
import { capt } from "@/lib/lib.ts";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
} & FormBaseProps;

const FormField: FC<PropsType> = ({
  el,
  register,
  errors,
  showLabel = true,
}) => {
  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        {showLabel && (
          <span className="txt__2">{el?.label ?? capt(el.field)}</span>
        )}

        <WrapperInput {...{ el, register, errors }} />
      </label>
    </div>
  );
};
export default FormField;
