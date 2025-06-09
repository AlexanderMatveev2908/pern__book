import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { isArrOk } from "@/core/lib/lib";
import { useState, type FC } from "react";
import { CartItemType } from "@/types/all/Cart";
import { BookStoreType } from "@/types/all/bookStore";
import CartItemsList from "./components/CartItemsList/CartItemsList";
import Title from "@/components/elements/Title";
import SummaryCart from "./components/SummaryCart/SummaryCart";
import Button from "@/components/elements/buttons/Button/Button";
import { BtnAct, BtnPopupKeys, EventApp } from "@/types/types";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { cartSLiceAPI } from "@/features/ConsumerLayout/CartLayout/cartSliceAPI";
import { useNavigate } from "react-router-dom";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { openToast } from "@/features/common/Toast/toastSlice";
import { useGroupItemsByStore } from "@/features/ConsumerLayout/CartLayout/hooks/useGroupItemsByStore";
import { useMixUserCartAsyncStates } from "@/features/ConsumerLayout/CartLayout/hooks/useMixUserCartAsyncStates";

export type CartItemsGroupedType = {
  store: BookStoreType;
  items: CartItemType[];
};

const CartPage: FC = () => {
  const { cart, isLoading, isError, error } = useMixUserCartAsyncStates();
  const [canStayNoCart, setCanStayNoCart] = useState(false);

  const nav = useNavigate();

  const { groupedByStoreID } = useGroupItemsByStore({
    cart,
  });

  const dispatch = useDispatch();
  const [mutate] = cartSLiceAPI.endpoints.deleteCart.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleOpenPop = () => {
    dispatch(
      openPopup({
        txt: "Are you sure about emptying your cart ?",
        leftBtn: {
          label: "I change idea",
          act: BtnAct.DO,
          cb: () => dispatch(closePopup()),
        },
        rightBtn: {
          label: "Empty cart",
          act: BtnAct.DEL,
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.LEFT));

            dispatch(closePopup());
            dispatch(
              openToast({
                type: EventApp.OK,
                msg: "Cart emptied",
                statusCode: 200,
              })
            );

            const res = await wrapMutationAPI({
              cbAPI: () => mutate(),
              showToast: false,
            });

            if (!res) return;

            nav("/", { replace: true });
          },
        },
      })
    );
  };

  return (
    <WrapPageAPI
      {...{
        isLoading,
        isError,
        error,
        isSuccess: isArrOk(cart?.items),
        canStay: !!cart?.items?.length || canStayNoCart,
      }}
    >
      <Title {...{ title: "Cart summary" }} />

      <Title {...{ title: "Items list", styleTxt: "txt__4" }} />

      <div className="w-full flex justify-end">
        <div className="w-full max-w-[300px]">
          <Button
            {...{
              label: "Empty Cart",
              act: BtnAct.DEL,
              Icon: FaRegTrashAlt,
              handleClick: handleOpenPop,
            }}
          />
        </div>
      </div>
      <CartItemsList {...{ groupedByStoreID, cart: cart! }} />

      <SummaryCart {...{ groupedByStoreID, cart: cart!, setCanStayNoCart }} />
    </WrapPageAPI>
  );
};

export default CartPage;
