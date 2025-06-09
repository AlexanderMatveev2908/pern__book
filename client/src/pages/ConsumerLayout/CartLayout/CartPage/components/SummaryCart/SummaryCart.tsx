import { type FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import { CartType } from "@/types/all/Cart";
import { priceFormatter } from "@/core/lib/lib";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import FormCoupon from "./components/FormCoupon";
import Button from "@/components/elements/buttons/Button/Button";
import {
  MdOutlineShoppingCartCheckout,
  MdOutlineVerified,
} from "react-icons/md";
import { BtnAct, TagsAPI } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useCalcTotCart } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcTotCart";
import FooterBar from "@/components/elements/FooterBar";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { checkoutSliceAPI } from "@/features/ConsumerLayout/CheckoutLayout/checkoutSliceAPI";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { useDispatch } from "react-redux";
import { rootAPI } from "@/features/root/rootAPI";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
  cart: CartType;
};

const checkoutLabel = {
  label: "checkout",
  icon: MdOutlineShoppingCartCheckout,
};

const verifyAccountLabel = {
  label: "Verify account",
  icon: MdOutlineVerified,
};

const SummaryCart: FC<PropsType> = ({ groupedByStoreID }) => {
  const { user } = useGetU();

  const nav = useNavigate();

  const { totalCart } = useCalcTotCart({
    groupedByStoreID,
  });

  const [mutate, { isLoading }] =
    checkoutSliceAPI.endpoints.createOrder.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const dispatch = useDispatch();
  const createOrder = async () => {
    const res = await wrapMutationAPI({
      cbAPI: () => mutate({ totPrice: totalCart }),
    });

    if (!res) {
      dispatch(rootAPI.util.invalidateTags([TagsAPI.USER_CART]));
      return;
    }

    nav(`/consumer/checkout/${res.orderID}`);
  };

  const verifyAccountClick = () => nav("/user/verify-account");

  return (
    <FooterBar>
      <WrapPairTxt
        {...{
          arg: ["total", priceFormatter(totalCart)],
          customStyles: [
            "txt__5 justify-self-center",
            "txt__5 justify-self-center",
          ],
        }}
      />

      <FormCoupon />

      <div className="w-full max-w-[400px] justify-self-center mt-3 sm:mt-6">
        <Button
          {...{
            label: user.isVerified
              ? checkoutLabel.label
              : verifyAccountLabel.label,
            Icon: user.isVerified
              ? checkoutLabel.icon
              : verifyAccountLabel.icon,
            act: user.isVerified ? BtnAct.DO : BtnAct.INFO,
            isDisabled: user.isVerified ? !totalCart : false,
            handleClick: user.isVerified ? createOrder : verifyAccountClick,
            isAging: isLoading,
          }}
        />
      </div>
    </FooterBar>
  );
};

export default SummaryCart;
