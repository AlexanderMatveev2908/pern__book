/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, type FC } from "react";
import { CartItemsGroupedType } from "../../CartPage";
import { CartType } from "@/types/all/Cart";
import Title from "@/components/elements/Title";

type PropsType = {
  groupedByStoreID: CartItemsGroupedType[];
  cart: CartType;
};

const SummaryCart: FC<PropsType> = ({ groupedByStoreID, cart }) => {
  const totalCart = useMemo(() => {
    const arr = Object.values(groupedByStoreID ?? {});

    return arr;
  }, [groupedByStoreID]);

  console.log(totalCart);

  return (
    <div className="w-[95%] grid grid-cols-1 fixed bottom-0 p-4 border-[3px] border-b-0  border-blue-600 rounded-t-xl bg-[#000]">
      <Title {...{ title: "total" }} />
    </div>
  );
};

export default SummaryCart;
