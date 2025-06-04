import { KEY_ACTION_CART } from "@/core/config/fieldsData/labels/shared";
import { clearTimer } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { CartBtnType } from "@/types/types";
import { useRef } from "react";

type Params = {
  localQty?: number;
  setLocalQty?: React.Dispatch<React.SetStateAction<number>>;
  label?: CartBtnType;
  book?: BookType;
};

export const useCartActionsPress = ({ setLocalQty, label, book }: Params) => {
  const pressRef = useRef<boolean>(false);
  const timerID = useRef<NodeJS.Timeout | null>(null);

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

            pressRef.current = false;
            clearTimer(timerID);
            return prev;
          });

          res();
        }, 150);
      });
    }
  };

  const handleMouseUp = () => {
    clearTimer(timerID);
    pressRef.current = false;
  };

  const handleMouseLeave = () => {
    clearTimer(timerID);
    pressRef.current = false;
  };

  return {
    handleMousePress,
    handleMouseUp,
    handleMouseLeave,
  };
};
