import { OrderStoreType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import ItemList from "../shared/ItemList";
import SpanInfoCard from "../shared/spans/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { TbDatabaseCog, TbPigMoney } from "react-icons/tb";
import { formatD, priceFormatter } from "@/core/lib/lib";
import { LuCalendarDays } from "react-icons/lu";

type PropsType = {
  os: OrderStoreType;
};

const OrderStoreItem: FC<PropsType> = ({ os }) => {
  const images = useMemo(
    () =>
      (os?.orderItemStores ?? [])
        .flatMap((oi) => oi.images?.[0])
        .filter((el) => !!el),
    [os]
  );

  return (
    <ItemList {...{ images }}>
      <SpanInfoCard
        {...{
          spanInfo: {
            label: os.bookStoreName,
            icon: HiLibrary,
          },
        }}
      />
      <SpanInfoCard
        {...{
          spanInfo: {
            label: priceFormatter(+os.amount + +os.delivery),
            icon: TbPigMoney,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: formatD(os.order!.orderedAt!),
            icon: LuCalendarDays,
          },
        }}
      />

      <SpanInfoCard
        {...{
          spanInfo: {
            label: os!.stage,
            icon: TbDatabaseCog,
          },
        }}
      />
    </ItemList>
  );
};

export default OrderStoreItem;
