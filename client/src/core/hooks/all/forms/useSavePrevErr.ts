/* eslint-disable @typescript-eslint/no-explicit-any */
import { canNestedPass } from "@/core/lib/lib";
import { NestedIndexProp } from "@/types/types";
import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export const useSavePrevErr = ({
  errors,
  key,
  index,
  nestedIndex,
}: {
  errors: FieldErrors;
  key: string;
  index?: number;
  nestedIndex?: NestedIndexProp;
}) => {
  const [prevErr, setPrevErr] = useState<string | null>(null);
  const msg =
    typeof index === "number"
      ? (errors?.items as any)?.[index]?.[key]?.message
      : canNestedPass(nestedIndex)
      ? (errors?.items as any)?.[nestedIndex!.index as number]?.[
          nestedIndex!.key
        ]?.message
      : (errors?.[key]?.message as string);

  useEffect(() => {
    if (msg) {
      setPrevErr(msg);
    }
  }, [msg, prevErr, errors]);

  return { prevErr };
};
