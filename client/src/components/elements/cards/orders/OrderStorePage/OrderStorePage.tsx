import { OrderStoreType, OrderType } from "@/types/all/orders";
import type { FC } from "react";
import { fieldsOrderStore } from "./fields";
import SpanPageInfo from "../../shared/spans/SpanPageInfo";
import SpanAddressOrder from "../SpanAddressOrder";
import OrderItemList from "../OrderItemList";

type PropsType = {
  os: OrderStoreType;
};

const OrderStorePage: FC<PropsType> = ({ os }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <div className="w-full grid grid-cols-1 p-5 border-blue-600 rounded-xl border-[3px] gap-y-4 gap-x-8 lg:grid-cols-2">
        {fieldsOrderStore(os).map((el) => (
          <SpanPageInfo
            key={el.id}
            {...{
              el,
              txt: "txt__3",
              styleParent: "grid-cols-[repeat(auto-fit,minmax(150px,1fr))]",
            }}
          />
        ))}
      </div>

      <SpanAddressOrder {...{ o: os.order as OrderType }} />

      <div className="list_items_app">
        {os!.orderItemStores!.map((ois) => (
          <OrderItemList
            key={ois.id}
            {...{
              ois,
              hasBeenOrdered: typeof os.order!.orderedAt === "string",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderStorePage;
