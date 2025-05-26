import { FormBaseProps, FormFieldBasic } from "@/types/types";
import { FC } from "react";
import { capt } from "@/core/lib/lib";
import ErrorFormField from "../Errors/ErrorFormField";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
} & FormBaseProps;

const TxtField: FC<PropsType> = ({
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

        <div className="w-full relative">
          <textarea
            placeholder={el?.place ?? `Your ${el?.label ?? capt(el.field)}...`}
            className="input__sm txt__2 scrollbar__y scrollbar__app"
            {...register(el.field)}
            rows={4}
          />
          <ErrorFormField
            {...{ errors, el, styleCont: { top: "-40%", right: "0%" } }}
          />
        </div>
      </label>
    </div>
  );
};

export default TxtField;
