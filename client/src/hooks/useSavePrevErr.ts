import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export const useSavePrevErr = (errors: FieldErrors, key: string) => {
  const [prevErr, setPrevErr] = useState<string | null>(null);
  const msg = errors?.[key]?.message as string;

  useEffect(() => {
    console.log(errors);
    if (msg && !prevErr) {
      setPrevErr(msg);
    }
  }, [msg, prevErr, errors]);

  return { prevErr };
};
