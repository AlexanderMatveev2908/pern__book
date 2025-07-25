import { BookType } from "@/types/all/books";
import { useEffect, useMemo, useState, type FC } from "react";
import {
  labelAddCart,
  labelDecQtyCart,
  labelRemoveFromCart,
} from "@/core/config/fieldsData/labels/shared";
import { CartType } from "@/types/all/Cart";
import WrapBtnCart from "./WrapBtnCart";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import PlaceholderLogic from "./PlaceholderLogic";
import MainBtnAddCart from "./MainBtnAddCart";

type PropsType = {
  book?: BookType;
  cart?: CartType;
};

const ButtonsCart: FC<PropsType> = ({ book, cart }) => {
  const [localQty, setLocalQty] = useState(0);

  const isLogged = useSelector(getAuthState).isLogged;

  const existingItemCartQty = useMemo(
    () => (cart?.items || []).find((el) => el?.bookID === book?.id)?.qty ?? 0,
    [book, cart]
  );

  useEffect(() => {
    setLocalQty(existingItemCartQty);
  }, [existingItemCartQty, setLocalQty]);

  return !isLogged ? (
    <PlaceholderLogic />
  ) : (
    <div className="w-full justify-items-center items-center gap-x-5 gap-y-5 justify-self-center grid grid-cols-1 button_cart">
      {!existingItemCartQty ? (
        <div className="w-full flex justify-center">
          <MainBtnAddCart
            {...{
              label: { ...labelAddCart, label: "Add to Cart" },
              book,
              disabledByParent: !book!.qty,
              existingItemCartQty,
            }}
          />
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-[1fr_40px_1fr] items-center justify-items-center max-w-[400px] gap-y-5 gap-x-6">
            {existingItemCartQty === 1 ? (
              <WrapBtnCart
                {...{
                  label: labelRemoveFromCart,
                  disabledByParent: !existingItemCartQty || !localQty,
                  book,
                }}
              />
            ) : (
              <WrapBtnCart
                {...{
                  label: labelDecQtyCart,
                  book,
                  setLocalQty,
                  localQty,
                  existingItemCartQty,
                }}
              />
            )}

            <div className="w-full max-w-[50px] flex justify-center">
              <span className="txt__5">{localQty}</span>
            </div>
            <WrapBtnCart
              {...{
                label: labelAddCart,
                book,
                setLocalQty,
                localQty,
                existingItemCartQty,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ButtonsCart;
