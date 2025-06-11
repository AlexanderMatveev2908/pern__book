import { OrderStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import ItemList from "../shared/ItemList";

type PropsType = {
  o: OrderStoreType;
};

const OrderStoreItem: FC<PropsType> = ({ o }) => {
  const images = useMemo(
    () => (o?.orderItemStores ?? [])?.flatMap((oi) => oi?.images ?? []),
    [o]
  );

  console.log(images);

  return <ItemList {...{ images }}></ItemList>;
};

export default OrderStoreItem;
