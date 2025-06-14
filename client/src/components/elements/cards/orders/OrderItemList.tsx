import ErrCard from "@/components/elements/cards/shared/ErrCard";
import ItemList from "@/components/elements/cards/shared/ItemList";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";
import SpanTitleCard from "@/components/elements/cards/shared/spans/SpanTitleCard";
import { isObjOk, priceFormatter } from "@/core/lib/lib";
import { OrderItemStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import { FaBook, FaDatabase, FaPenFancy } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";

type PropsType = {
  ois: OrderItemStoreType;
  hasBeenOrdered?: boolean;
};

const OrderItemList: FC<PropsType> = ({ ois, hasBeenOrdered }) => {
  const isOutOfStock = useMemo(
    () => ois?.qty > (ois?.book?.qty ?? 0) && !hasBeenOrdered,
    [ois, hasBeenOrdered]
  );
  const isDeleted = useMemo(
    () => !isObjOk(ois?.book) && !hasBeenOrdered,
    [ois, hasBeenOrdered]
  );

  return (
    <div className={`card border-neutral-800`}>
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

          {isDeleted || isOutOfStock ? (
            <ErrCard
              {...{
                msg: isDeleted
                  ? "This item has been removed from stock"
                  : "Item not currently available",
              }}
            />
          ) : (
            <div className=""></div>
          )}
        </ItemList>
      </div>
    </div>
  );
};

export default OrderItemList;
