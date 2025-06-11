import { OrderStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { TbPigMoney, TbTruckDelivery } from "react-icons/tb";
import { priceFormatter } from "@/core/lib/lib";
import { FaDatabase } from "react-icons/fa";

type PropsType = {
  o: OrderStoreType;
};

const OrderStoreItem: FC<PropsType> = ({ o }) => {
  const images = useMemo(
    () => (o?.orderItemStores ?? [])?.flatMap((oi) => oi?.images ?? []),
    [o]
  );

  console.log(images);

  return (
    <ItemList {...{ images }}>
      <SpanInfoCard
        {...{
          spanInfo: {
            label: o!.store!.name,
            icon: HiLibrary,
          },
        }}
      />
      <SpanInfoCard
        {...{
          spanInfo: {
            label: priceFormatter(+o.amount + +o.delivery),
            icon: TbPigMoney,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: priceFormatter(+o.delivery, "Free Delivery"),
            icon: TbTruckDelivery,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: o!.totItems,
            icon: FaDatabase,
          },
        }}
      />
    </ItemList>
  );
};

export default OrderStoreItem;
