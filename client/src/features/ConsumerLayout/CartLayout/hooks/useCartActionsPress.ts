import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { clearTimer } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { CartBtnType } from "@/types/types";
import { useCallback, useEffect, useRef } from "react";
import { cartSLiceAPI } from "../cartSliceAPI";
import { useWrapMutationAPI } from "@/core/hooks/hooks";

type Params = {
  localQty?: number;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  label?: CartBtnType;
  book?: BookType;
};

export const useCartActionsPress = ({
  setLocalQty,
  localQty,
  label,
  book,
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

    const res = await wrapMutationAPI({
      cbAPI: () =>
        mutate({
          bookID: book?.id ?? "",
          qty: localQty ?? 0,
        }),
    });

    if (!res) return;
  }, [wrapMutationAPI, book, localQty, mutate]);

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

  useEffect(() => {
    const handleMouseUp = async () => {
      await handleSave();
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleSave]);

  return {
    handleMousePress,
    handleMouseLeave: handleSave,
    isLoading,
  };
};
