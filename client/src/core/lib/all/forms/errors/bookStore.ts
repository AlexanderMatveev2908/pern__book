/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fieldsContact,
  fieldsDelivery,
  fieldsSwapStore,
} from "@/core/config/fieldsData/OwnerLayout/post";
import { SwapModeType } from "@/core/contexts/SwapCtx/ctx/initState";
import { FieldErrors, UseFormSetFocus } from "react-hook-form";
import { makeDelay } from "../../API/API";

//
export const handleFocusErrStore = (
  setFocus: UseFormSetFocus<any>,
  errs: FieldErrors,
  setCurrForm: (val: number, swapMode?: SwapModeType | null) => void
): void => {
  const errKeys = Object.keys(errs);

  if (errKeys.includes("name")) {
    setFocus("name");
    return;
  } else if (errKeys.includes("description")) {
    setFocus("description");
    return;
  } else if (errKeys.includes("video")) {
    setFocus("video_a");
    return;
  } else if (errKeys.includes("images")) {
    setFocus("images_a");
    return;
  } else if (errKeys.includes("categories")) {
    setFocus("categories_a");
    return;
  }

  const contactKeys = fieldsContact.map((el) => el.field);
  let i = 0;

  do {
    const curr = contactKeys[i];
    if (errKeys.includes(curr)) {
      setFocus(curr);
      return;
    }

    i++;
  } while (i < contactKeys.length);

  i = 0;

  do {
    const currArr = fieldsSwapStore[i];

    let j = 0;

    do {
      const curr = currArr[j];
      if (errKeys.includes(curr.field)) {
        const swap = document.getElementById("swapFormStoreCreate");
        if (!swap) {
          return;
        }

        const distance =
          swap.getBoundingClientRect().top +
          window.scrollY -
          swap.offsetHeight / 2;

        setCurrForm(i, null);

        window.scroll({
          top: distance,
          behavior: "smooth",
        });
        makeDelay(() => setFocus(curr.field), 500);

        return;
      }

      j++;
    } while (j < currArr.length);

    i++;
  } while (i < fieldsSwapStore.length);

  i = 0;

  const keysDel = fieldsDelivery.map((el) => el.field);

  do {
    const curr = keysDel[i];
    if (errKeys.includes(curr)) {
      setFocus(curr);
      return;
    }

    i++;
  } while (i < keysDel.length);

  i = 0;

  while (i < (errs as any)?.items?.length) {
    const curr = (errs as any).items[i];

    if (
      Object.values(curr ?? {}).some(
        (el) => (el as any)?.message?.trim().length
      )
    ) {
      if (curr.email) {
        setFocus(`items.${i}.email`);
      } else {
        setFocus(`mySelect.${i}._a`);
      }

      return;
    }

    i++;
  }
};

/*

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
