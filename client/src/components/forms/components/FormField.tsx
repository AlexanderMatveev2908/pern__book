import { FC } from "react";
import { FormFieldBasic } from "../../../types/generalFields";

type PropsType = {
  el: FormFieldBasic;
};

const FormField: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid">
      <label className="grid w-full gap-2">
        <span className="txt__2 font-semibold">{el.label}</span>

        <input
          type={el.type ?? "text"}
          placeholder={el.place ?? `Your ${el.label}...`}
          className="input__base txt__2"
        />
      </label>
    </div>
  );
};
export default FormField;
