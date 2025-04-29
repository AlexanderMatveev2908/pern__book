import { FC } from "react";
import { FormBaseProps, FormFieldBasic } from "../../../../../types/types.ts";
import { capt } from "@/lib/lib.ts";
import { ErrorFormField } from "@/components/components.ts";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
  customStyle?: string;
  index?: number;
} & FormBaseProps;

const FormField: FC<PropsType> = ({
  el,
  register,
  errors,
  customStyle,
  showLabel = true,
  index,
}) => {
  const registerParamHook =
    typeof index === "number" ? `items.${index}.${el.field}` : el.field;

  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        {showLabel && (
          <span className="txt__2">{el?.label ?? capt(el.field)}</span>
        )}

        <div className="w-full relative">
          <input
            type={el.type ?? "text"}
            step={el.type === "number" ? "any" : undefined}
            placeholder={el?.place ?? `Your ${el?.label ?? capt(el.field)}...`}
            className={`${customStyle ?? "input__base"} txt__2`}
            {...register(registerParamHook)}
          />
          <ErrorFormField {...{ errors, el, index }} />
        </div>
      </label>
    </div>
  );
};
export default FormField;
