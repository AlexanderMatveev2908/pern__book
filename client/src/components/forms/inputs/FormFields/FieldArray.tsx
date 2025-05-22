import { capt } from "@/core/lib/lib";
import { FormBaseProps, FormFieldBasic } from "@/types/types";
import { FC } from "react";
import ErrorFormField from "../../Errors/ErrorFormField";

type PropsType = {
  index: number;
  el: FormFieldBasic;
  customStyle?: string;
} & FormBaseProps;

const FieldArray: FC<PropsType> = ({
  register,
  errors,
  index,
  el,
  customStyle,
}) => {
  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2 relative">
        <div className="w-full relative">
          <input
            type={el.type ?? "text"}
            step={el.type === "number" ? "any" : undefined}
            placeholder={el?.place ?? `Your ${el?.label ?? capt(el.field)}...`}
            className={`${customStyle ?? "input__base"} txt__2`}
            {...register(`items.${index}.${el.field}`)}
          />
          <ErrorFormField {...{ errors, el, index }} />
        </div>
      </label>
    </div>
  );
};

export default FieldArray;
