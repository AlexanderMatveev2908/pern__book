import OrderStoreItem from "@/components/elements/cards/orders/OrderStoreItem";
import ItemID from "@/components/elements/cards/shared/spans/ItemID";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import { OrderStoreType } from "@/types/all/orders";
import type { FC } from "react";

type PropsType = {
  os: OrderStoreType;
};

const OrderStoreItemOwner: FC<PropsType> = ({ os }) => {
  return (
    <div className="card border-neutral-800">
      <div className="body_card">
        <ItemID {...{ ID: os.id }} />

        <OrderStoreItem {...{ os: os }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{
            ids: [`/owner/orders/${os.id}`],
          }}
        />
      </div>
    </div>
  );
};

export default OrderStoreItemOwner;
