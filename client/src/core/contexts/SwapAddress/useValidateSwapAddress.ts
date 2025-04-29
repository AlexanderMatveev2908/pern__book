// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { swapAddressByArea } from "@/core/config/fieldsData/UserLayout/pofile";
// import { validateSwapper } from "@/core/lib/lib";
// import { useEffect, useState } from "react";
// import { FieldErrors, UseFormWatch } from "react-hook-form";

// type Params = {
//   watch: UseFormWatch<any>;
//   errors: FieldErrors;
//   currForm: number;
//   isNextDisabled: boolean;
//   setNextDisabled: (val: boolean) => void;
// };

// export const useValidateSwapAddress = ({
//   watch,
//   errors,
//   currForm,
//   isNextDisabled,
//   setNextDisabled,
// }: Params) => {
//   const [isFormOk, setIsFormOk] = useState(true);

//   useEffect(() => {
//     const sub = watch((valsForm) => {
//       const { isValid, i } = validateSwapper({
//         objErr: errors,
//         fieldsByArea: swapAddressByArea,
//         valsForm,
//       });
//       const len = Object.keys(errors).length;

//       // __cg("errors", len);
//       // __cg("swapper", isValid, i, j);

//       if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
//       else if ((isValid || currForm < i) && isNextDisabled)
//         setNextDisabled(false);

//       if (len && isFormOk) setIsFormOk(false);
//       else if (!len && !isFormOk) setIsFormOk(true);
//     });

//     return () => {
//       sub.unsubscribe();
//     };
//   }, [watch, currForm, errors, isNextDisabled, setNextDisabled, isFormOk]);

//   return { isFormOk };
// };
