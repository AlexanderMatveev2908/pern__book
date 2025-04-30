/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormSetFocus } from "react-hook-form";

//
export const handleFocusErrStore = (
  setFocus: UseFormSetFocus<any>,
  errs: FieldErrors
): void => {
  const errKeys = Object.keys(errs);

  if (errKeys.includes("name")) setFocus("name");
  else if (errKeys.includes("description")) setFocus("description");
};

/*
 const swap = document.getElementById("swapFormStoreCreate");
          if (!swap) return;
          const distance =
            swap.getBoundingClientRect().top +
            window.scrollY -
            swap.offsetHeight / 2;

          setCurrForm(1, null);

          window.scroll({
            top: distance,
            behavior: "smooth",
          });
          */

/*
const setFocusShort = <T extends FieldValues>({
  arrKeys,
  key,
  setFocus,
}: {
  arrKeys: Path<T>[];
  key: Path<T>;
  setFocus: UseFormSetFocus<T>;
}) => {
  if (arrKeys.includes(key)) setFocus(key);
};
*/
