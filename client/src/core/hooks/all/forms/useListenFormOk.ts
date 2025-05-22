/* eslint-disable @typescript-eslint/no-explicit-any */
import { __cg } from "@/core/lib/lib";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormWatch } from "react-hook-form";

type Params = {
  customValidateCB?: (vals?: any) => boolean;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
};

export const useListenFormOk = ({
  customValidateCB,
  errors,
  watch,
}: Params) => {
  const [isFormOk, setIsFormOk] = useState(false);

  const vals = watch();

  useEffect(() => {
    const listen = () => {
      const len = !!Object.keys(errors).length;
      const makeMakeAPI =
        typeof customValidateCB === "function" ? customValidateCB(vals) : true;

      __cg("make api", makeMakeAPI);

      if ((len || !makeMakeAPI) && isFormOk) setIsFormOk(false);
      else if (!len && makeMakeAPI && !isFormOk) setIsFormOk(true);
    };

    listen();
  }, [customValidateCB, errors, isFormOk, vals]);

  return {
    isFormOk,
  };
};
