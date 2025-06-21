/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSavePrevErr } from "@/core/hooks/hooks";
import { canNestedPass } from "@/core/lib/lib";
import { FormFieldBasic, NestedIndexProp } from "@/types/types";
import { FC, useMemo } from "react";
import { FieldErrors } from "react-hook-form";

type PropsType = {
  errors: FieldErrors;
  el?: FormFieldBasic;
  styleCont?: {
    [key: string]: string;
  };
  index?: number;
  nestedIndex?: NestedIndexProp;
  testID?: string;
};

const ErrorFormField: FC<PropsType> = ({
  errors,
  el,
  nestedIndex,
  styleCont,
  index,
}) => {
  const msg =
    typeof index === "number"
      ? ((errors?.items as any)?.[index]?.[el?.field ?? ""]?.message as string)
      : canNestedPass(nestedIndex)
      ? (errors?.items as any)?.[nestedIndex!.index as number]?.[
          nestedIndex!.key
        ]?.message
      : errors?.[el?.field ?? ""]?.message;
  const { prevErr } = useSavePrevErr({
    errors,
    key: el?.field ?? "",
    index,
    nestedIndex,
  });

  const defStyle = useMemo(
    () => ({
      top: "0%",
      right: "0%",
      transform: "translateY(-115%)",
    }),
    []
  );

  return !el ? null : (
    <div
      data-testid={`err-msg-${el.field}`}
      className={`absolute transition-all pointer-events-none duration-[0.4s] ${
        msg ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"
      } min-h-full z-60`}
      style={styleCont ?? defStyle}
    >
      <div
        className={`text-red-600 border-2 border-red-600 rounded-xl py-1 px-5 bg-[#000] relative`}
      >
        <span
          className="txt__1 text-red-600 text-nowrap
          sm:break-after-all"
        >
          {(msg as string) || prevErr}
        </span>
        <div
          className={`absolute w-[30px] h-[30px] right-[25px] overflow-hidden z-40 top-full`}
        >
          <div className="w-[30px] h-[30px] border-2 border-red-600 bg-[#000] rotate-45 absolute -top-[5px] -translate-y-1/2 left-0"></div>
        </div>
      </div>
    </div>
  );
};
export default ErrorFormField;
