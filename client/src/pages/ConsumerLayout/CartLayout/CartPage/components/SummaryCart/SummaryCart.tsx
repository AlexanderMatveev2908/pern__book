import { type FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import { CartType } from "@/types/all/Cart";
import { priceFormatter } from "@/core/lib/lib";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import FormCoupon from "./components/FormCoupon";
import Button from "@/components/elements/buttons/Button/Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BtnAct } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { useCalcTotCart } from "@/features/ConsumerLayout/CartLayout/hooks/useCalcTotCart";
import FooterBar from "@/components/elements/FooterBar";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
  cart: CartType;
};

const checkoutLabel = {
  label: "checkout",
  icon: MdOutlineShoppingCartCheckout,
};

const SummaryCart: FC<PropsType> = ({ groupedByStoreID }) => {
  const nav = useNavigate();

  const { totalCart } = useCalcTotCart({
    groupedByStoreID,
  });
  const handleClick = () => {
    nav("/consumer/checkout");
  };

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
            label: checkoutLabel.label,
            Icon: checkoutLabel.icon,
            act: BtnAct.DO,
            isDisabled: !totalCart,
            handleClick,
          }}
        />
      </div>
    </FooterBar>
  );
};

export default SummaryCart;
