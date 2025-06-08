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
import { BtnAct } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useCalcTotCart } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcTotCart";
import FooterBar from "@/components/elements/FooterBar";
import { useGetU } from "@/core/hooks/all/api/useGetU";

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
  const handleClick = () =>
    nav(user.isVerified ? "/consumer/checkout" : "/user/verify-account");

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
            handleClick,
          }}
        />
      </div>
    </FooterBar>
  );
};

export default SummaryCart;
