import ItemList from "@/components/elements/cards/shared/ItemList";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";
import SpanTitleCard from "@/components/elements/cards/shared/spans/SpanTitleCard";
import { priceFormatter } from "@/core/lib/lib";
import { OrderItemStoreType } from "@/types/all/orders";
import type { FC } from "react";
import { FaBook, FaDatabase, FaPenFancy } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

type PropsType = {
  ois: OrderItemStoreType;
};

const OrderItemConsumer: FC<PropsType> = ({ ois }) => {
  return (
    <div className="card">
      <div className="body_card">
        <SpanTitleCard
          {...{
            label: {
              label: ois.title,
              icon: FaBook,
            },
          }}
        />

        <ItemList {...{ images: ois?.images }}>
          <SpanInfoCard
            {...{
              spanInfo: {
                icon: FaPenFancy,
                label: ois!.author,
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: TbPigMoney,
                label: priceFormatter(ois?.price),
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: FaDatabase,
                label: ois?.qty,
              },
            }}
          />
        </ItemList>
      </div>
    </div>
  );
};

export default OrderItemConsumer;
