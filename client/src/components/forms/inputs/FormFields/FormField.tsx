/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { canNestedPass, capt } from "@/core/lib/lib.ts";
import ErrorFormField from "../../Errors/ErrorFormField.tsx";
import {
  FormBaseProps,
  FormFieldBasic,
  NestedIndexProp,
} from "@/types/types.ts";

type PropsType = {
  el: FormFieldBasic;
  showLabel?: boolean;
  customStyle?: string;
  index?: number;
  styleContErr?: {
    [key: string]: string;
  };
  nestedIndex?: NestedIndexProp;
  children?: ReactNode;
  customCB?: ((val: any) => void) | null;
} & FormBaseProps;

const FormField: FC<PropsType> = ({
  el,
  register,
  errors,
  customStyle,
  showLabel = true,
  index,
  styleContErr,
  children,
  nestedIndex,
  customCB,
}) => {
  const registerParamHook =
    typeof index === "number"
      ? `items.${index}.${el.field}`
      : canNestedPass(nestedIndex)
      ? `items.${nestedIndex!.index}.${nestedIndex!.key}`
      : el.field;

  const { onChange, ...rest } = register(registerParamHook);

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
            {...rest}
            onChange={(e) => {
              onChange(e);

              if (typeof customCB === "function") customCB(e.target.value);
            }}
            // {...register(registerParamHook)}
          />
          {children ?? (
            <ErrorFormField
              {...{ errors, el, nestedIndex, index, styleCont: styleContErr }}
            />
          )}
        </div>
      </label>
    </div>
  );
};
export default FormField;
