import { OrderType } from "@/types/all/orders";
import type { FC } from "react";
import OrderStoreItemConsumer from "./components/OrderStoreItemConsumer";

type PropsType = {
  o: OrderType;
};

const BodyOrderConsumer: FC<PropsType> = ({ o }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-6">
      {(o?.orderStores ?? []).map((os) => (
        <OrderStoreItemConsumer
          key={os.id}
          {...{ os, hasBeenOrdered: typeof o.orderedAt === "string" }}
        />
      ))}
    </div>
  );
};

export default BodyOrderConsumer;
