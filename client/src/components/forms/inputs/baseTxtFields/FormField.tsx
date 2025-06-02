/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { capt } from "@/core/lib/lib.ts";
import ErrorFormField from "../../Errors/ErrorFormField.tsx";
import { FormFieldBasic } from "@/types/types.ts";
import { Control, Controller, FieldErrors } from "react-hook-form";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
  customStyle?: string;
  index?: number;
  styleContErr?: {
    [key: string]: string;
  };
  children?: ReactNode;
  customCB?: ((val: any) => void) | null;
  isDisabled?: boolean;
  control: Control<any>;
  errors: FieldErrors;
};

const FormField: FC<PropsType> = ({
  el,
  errors,
  customStyle,
  showLabel = true,
  index,
  styleContErr,
  children,
  customCB,
  isDisabled,
  control,
}) => {
  const registerParamHook =
    typeof index === "number" ? `items.${index}.${el.field}` : el.field;

  return (
    <div className={`w-full grid ${isDisabled ? "opacity-50" : ""}`}>
      <label className="grid w-full gap-2 relative">
        {showLabel && (
          <span className="txt__2">{el?.label ?? capt(el.field)}</span>
        )}

        <div className="w-full relative">
          <Controller
            name={registerParamHook}
            control={control}
            render={({ field }) => (
              <input
                ref={field.ref}
                type={el.type ?? "text"}
                step={el.type === "number" ? "any" : undefined}
                placeholder={
                  el?.place ?? `Your ${el?.label ?? capt(el.field)}...`
                }
                className={`${customStyle ?? "input__sm"} txt__2`}
                disabled={isDisabled}
                value={field.value ?? ""}
                onChange={(e) => {
                  field.onChange(e);

                  if (typeof customCB === "function") customCB(e.target.value);
                }}
              />
            )}
          />
          {children ?? (
            <ErrorFormField
              {...{ errors, el, index, styleCont: styleContErr }}
            />
          )}
        </div>
      </label>
    </div>
  );
};
export default FormField;
