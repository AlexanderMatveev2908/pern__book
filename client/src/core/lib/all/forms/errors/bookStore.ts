/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormSetFocus } from "react-hook-form";

//
export const handleFocusErrStore = (
  setFocus: UseFormSetFocus<any>,
  errs: FieldErrors
): void => {
  const errKeys = Object.keys(errs);

  console.log(errKeys);

  if (errKeys.includes("name")) setFocus("name");
  else if (errKeys.includes("description")) setFocus("description");
  else if (errKeys.includes("video")) setFocus("video_a");
  else if (errKeys.includes("images")) setFocus("images_a");
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
