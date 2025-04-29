/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export const useSavePrevErr = ({
  errors,
  key,
  index,
}: {
  errors: FieldErrors;
  key: string;
  index?: number;
}) => {
  const [prevErr, setPrevErr] = useState<string | null>(null);
  const msg =
    typeof index === "number"
      ? (errors?.items as any)?.[index]?.[key]?.message
      : (errors?.[key]?.message as string);

  useEffect(() => {
    if (msg) {
      setPrevErr(msg);
    }
  }, [msg, prevErr, errors]);

  console.log(msg);

  return { prevErr };
};
