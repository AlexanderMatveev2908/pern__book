import { useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

type Params = {
  customValidateCB?: () => boolean;
  errors: FieldErrors;
};

export const useListenFormOk = ({ customValidateCB, errors }: Params) => {
  const [isFormOk, setIsFormOk] = useState(false);

  useEffect(() => {
    const listen = () => {
      const len = Object.keys(errors).length;
      const makeMakeAPI =
        typeof customValidateCB === "function" ? customValidateCB() : true;

      if ((len || !makeMakeAPI) && isFormOk) setIsFormOk(false);
      else if (!len && makeMakeAPI && !isFormOk) setIsFormOk(true);
    };

    listen();
  }, [customValidateCB, errors, isFormOk]);

  return {
    isFormOk,
  };
};
