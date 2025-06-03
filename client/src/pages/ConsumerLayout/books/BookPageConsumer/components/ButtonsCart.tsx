import { BookType } from "@/types/all/books";
import { useMemo, type FC } from "react";
import WrapBtnCart from "./subComponents/WrapBtnCart";
import {
  labelAddCart,
  labelDecQtyCart,
  labelRemoveFromCart,
} from "@/core/config/fieldsData/labels/shared";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";

type PropsType = {
  book: BookType;
};

const ButtonsCart: FC<PropsType> = ({ book }) => {
  const { cart } = useGetCart();

  const existentItemCartQty = useMemo(
    () => (cart?.items || []).find((el) => el?.bookID === book.id)?.qty ?? 0,
    [book, cart]
  );

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
            disabled: !book?.qty || existentItemCartQty >= book?.qty,
            bookID: book.id,
          }}
        />

        <div className="w-full max-w-[50px] flex justify-center">
          <span className="txt__5">{existentItemCartQty}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-items-center items-center">
        <WrapBtnCart
          {...{
            label: labelDecQtyCart,
            disabled: !existentItemCartQty,
            bookID: book.id,
          }}
        />
        <WrapBtnCart
          {...{
            label: labelRemoveFromCart,
            disabled: !existentItemCartQty,
            bookID: book.id,
          }}
        />
      </div>
    </div>
  );
};

export default ButtonsCart;
