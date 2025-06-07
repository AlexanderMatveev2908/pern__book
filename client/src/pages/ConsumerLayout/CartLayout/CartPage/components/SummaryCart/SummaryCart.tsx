import { useMemo, useState, type FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import { CartType } from "@/types/all/Cart";
import { priceFormatter } from "@/core/lib/lib";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import FormCoupon from "./components/FormCoupon";
import Button from "@/components/elements/buttons/Button/Button";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BtnAct } from "@/types/types";
import { FaAngleDoubleUp } from "react-icons/fa";
import { calcTotPriceCart, getDeliveryPrice } from "@/core/lib/all/utils/calc";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
  cart: CartType;
};

const checkoutLabel = {
  label: "checkout",
  icon: MdOutlineShoppingCartCheckout,
};

const SummaryCart: FC<PropsType> = ({ groupedByStoreID }) => {
  const [isFooterOpen, setIsFooterOpen] = useState(true);

  const totalCart = useMemo(() => {
    const arr = Object.values(groupedByStoreID ?? {});

    let i = arr.length - 1;
    let tot = 0;

    while (i >= 0) {
      const { store, items } = arr[i];

      const subTotal = calcTotPriceCart(items);
      tot += subTotal;
      tot += subTotal
        ? getDeliveryPrice({
            subTotal,
            store: store!,
          })
        : 0;

      i--;
    }

    return tot;
  }, [groupedByStoreID]);

  return (
    <div
      className={`w-[95%] grid grid-cols-1 gap-y-3 fixed bottom-0 p-4 border-[3px] border-b-0  border-blue-600 rounded-t-xl bg-[#000] z-60 max-w-[800px] transition-all duration-500 ${
        isFooterOpen ? "translate-y-0" : "translate-y-[80%]"
      }`}
    >
      <div
        onClick={() => setIsFooterOpen(!isFooterOpen)}
        className="w-full flex justify-center -mt-2 hover:text-blue-600 cursor-pointer"
      >
        <FaAngleDoubleUp
          className={`min-w-[50px] min-h-[50px] transition-all duration-500 ${
            isFooterOpen ? "rotate-180" : ""
          }`}
        />
      </div>

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
          }}
        />
      </div>
    </div>
  );
};

export default SummaryCart;
