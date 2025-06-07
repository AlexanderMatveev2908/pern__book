/* eslint-disable @typescript-eslint/no-explicit-any */
import { addressFieldsByArea } from "@/core/config/fieldsData/shared/forms";
import { SwapModeType } from "@/core/contexts/SwapCtx/ctx/initState";
import { FieldErrors, UseFormSetFocus } from "react-hook-form";
import { makeDelay } from "../../API/API";

export const handleErrFocusCheckout = async (
  errs: FieldErrors,
  setFocus: UseFormSetFocus<any>,
  setCurrForm: (val: number, swapMode?: SwapModeType | null) => void
) => {
  const errKeys = Object.keys(errs);
  const swapID = "swapCheckoutForm";

  let i = 0;

  while (i < addressFieldsByArea.length) {
    const currArr = addressFieldsByArea[i];

    let j = 0;

    while (j < currArr.length) {
      const curr = currArr[j];

      if (errKeys.includes(curr.field)) {
        const swap = document.getElementById(swapID);
        if (!swap) return;

        // ? top window (can be pos if below negative is already scrolled) + scrolled give more precise position, add half height to center element (not centered 100% but nearly)
        const distance =
          swap.getBoundingClientRect().top +
          window.scrollY -
          swap.offsetHeight / 2;

        setCurrForm(i, null);

        window.scroll({
          top: distance,
          behavior: "smooth",
        });
        await makeDelay(() => setFocus(curr.field), 500);

        return;
      }

      j++;
    }

    i++;
  }
};
