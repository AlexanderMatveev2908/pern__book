import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { clearTimer } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { CartBtnType } from "@/types/types";
import { useCallback, useRef } from "react";
import { cartSLiceAPI } from "../cartSliceAPI";
import { useWrapMutationAPI } from "@/core/hooks/hooks";

type Params = {
  localQty?: number;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  label?: CartBtnType;
  book?: BookType;
  existingItemCartQty?: number;
  setIsDisabled?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCartActionsPress = ({
  setLocalQty,
  localQty,
  label,
  book,
  existingItemCartQty = 0,
  setIsDisabled,
}: Params) => {
  const pressRef = useRef<boolean>(false);
  const timerID = useRef<NodeJS.Timeout | null>(null);

  const [mutate, { isLoading }] =
    cartSLiceAPI.endpoints.updateCartMousePress.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = useCallback(async () => {
    if (!pressRef.current) return;

    clearTimer(timerID);
    pressRef.current = false;

    if (
      (localQty ?? -Infinity) < 0 ||
      (localQty ?? Infinity) > (book?.qty ?? -Infinity)
    )
      return;

    let safeVal: null | number | undefined = null;

    if (localQty === existingItemCartQty) {
      if (label?.keyAction === KEY_ACTION_CART.INC_QTY_CART)
        safeVal =
          existingItemCartQty + 1 > (book?.qty ?? -Infinity) ||
          localQty + 1 > (book?.qty ?? -Infinity)
            ? null
            : existingItemCartQty + 1;
      else
        safeVal =
          existingItemCartQty - 1 < 0 || localQty - 1 < 0
            ? null
            : existingItemCartQty - 1;
    } else {
      safeVal = localQty;
    }

    if (typeof safeVal !== "number") return;

    const res = await wrapMutationAPI({
      cbAPI: () =>
        mutate({
          bookID: book?.id ?? "",
          qty: safeVal,
        }),
    });

    if (!res) return;
  }, [wrapMutationAPI, book, localQty, mutate, existingItemCartQty, label]);

  const handleMousePress = async () => {
    if (typeof setLocalQty !== "function") return;

    pressRef.current = true;
    clearTimer(timerID);

    while (pressRef.current) {
      await new Promise<void>((res) => {
        timerID.current = setTimeout(() => {
          setLocalQty((prev) => {
            if (label?.keyAction === KEY_ACTION_CART.INC_QTY_CART) {
              if ((prev ?? Infinity) < (book?.qty ?? -Infinity))
                return prev + 1;
            } else {
              if ((prev ?? -Infinity) > 0) return prev - 1;
            }

            clearTimer(timerID);
            return prev;
          });

          res();
        }, 150);
      });
    }
  };

  return {
    handleMousePress,
    handleMouseLeave: handleSave,
    handleMouseUp: handleSave,
    isLoading,
  };
};
