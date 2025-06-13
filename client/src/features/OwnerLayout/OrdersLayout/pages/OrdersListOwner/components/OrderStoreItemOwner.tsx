import OrderStoreItem from "@/components/elements/cards/orders/OrderStoreItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import { OrderStoreType } from "@/types/all/orders";
import type { FC } from "react";

type PropsType = {
  o: OrderStoreType;
};

const OrderStoreItemOwner: FC<PropsType> = ({ o }) => {
  return (
    <div className="card">
      <div className="body_card">
        <ItemID {...{ ID: o.id }} />

        <OrderStoreItem {...{ o }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{
            ids: [`/owner/orders/${o.id}`],
          }}
        />
      </div>
    </div>
  );
};

export default OrderStoreItemOwner;
