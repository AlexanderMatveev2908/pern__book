/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useMemo } from "react";
import { capt } from "@/core/lib/lib.ts";
import {
  FormBaseProps,
  FormFieldBasic,
  NestedIndexProp,
} from "@/types/types.ts";
import { Control, Controller } from "react-hook-form";
import ErrorFormField from "../../Errors/ErrorFormField";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
  customStyle?: string;
  styleContErr?: {
    [key: string]: string;
  };
  nestedIndex: NestedIndexProp;
  children?: ReactNode;
  customCB?: ((val: any) => void) | null;
  isDisabled?: boolean;
  control: Control;
} & FormBaseProps;

const FormFieldNested: FC<PropsType> = ({
  el,
  errors,
  customStyle,
  showLabel = true,
  styleContErr,
  children,
  nestedIndex,
  isDisabled,
  customCB,
  control,
}) => {
  const param = useMemo(
    () => `items.${nestedIndex.index}.${nestedIndex.key}`,
    [nestedIndex]
  );

  return (
    <div className={`w-full grid ${isDisabled ? "opacity-50" : ""}`}>
      <label className="grid w-full gap-2 relative">
        {showLabel && (
          <span className="txt__2">{el?.label ?? capt(el.field)}</span>
        )}

        <div className="w-full relative">
          <Controller
            name={param}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={el.type ?? "text"}
                step={el.type === "number" ? "any" : undefined}
                placeholder={
                  el?.place ?? `Your ${el?.label ?? capt(el.field)}...`
                }
                className={`${customStyle ?? "input__sm"} txt__2`}
                disabled={isDisabled}
                onChange={(e) => {
                  const { value: v } = e.target;

                  field.onChange(e);

                  if (typeof customCB === "function") customCB(v);
                }}
              />
            )}
          />

          {children ?? (
            <ErrorFormField
              {...{ errors, el, nestedIndex, styleCont: styleContErr }}
            />
          )}
        </div>
      </label>
    </div>
  );
};
export default FormFieldNested;
