import { BookType } from "@/types/all/books";
import { useEffect, useMemo, useState, type FC } from "react";
import WrapBtnCart from "./subComponents/WrapBtnCart";
import {
  labelAddCart,
  labelDecQtyCart,
  labelRemoveFromCart,
} from "@/core/config/fieldsData/labels/shared";
import { CartType } from "@/types/all/Cart";

type PropsType = {
  book?: BookType;
  cart?: CartType;
};

const ButtonsCart: FC<PropsType> = ({ book, cart }) => {
  const [localQty, setLocalQty] = useState(0);

  const existingItemCartQty = useMemo(
    () => (cart?.items || []).find((el) => el?.bookID === book?.id)?.qty ?? 0,
    [book, cart]
  );

  useEffect(() => {
    setLocalQty(existingItemCartQty);
  }, [existingItemCartQty, setLocalQty]);

  return (
    <div
      className="w-full justify-items-center items-center gap-x-5 gap-y-5 md:max-w-[600px] justify-self-center"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      }}
    >
      <div className="w-full grid grid-cols-2 items-center justify-items-center">
        <WrapBtnCart
          {...{
            label: labelAddCart,
            // disabled:
            //   !book?.qty ||
            //   existingItemCartQty >= book?.qty ||
            //   localQty >= book?.qty,
            book,
            setLocalQty,
            localQty,
            existingItemCartQty,
          }}
        />

        <div className="w-full max-w-[50px] flex justify-center">
          <span className="txt__5">{localQty}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-items-center items-center">
        <WrapBtnCart
          {...{
            label: labelDecQtyCart,
            // disabled: !existingItemCartQty || !localQty,
            book,
            setLocalQty,
            localQty,
            existingItemCartQty,
          }}
        />
        <WrapBtnCart
          {...{
            label: labelRemoveFromCart,
            disabled: !existingItemCartQty || !localQty,
            book,
          }}
        />
      </div>
    </div>
  );
};

export default ButtonsCart;
