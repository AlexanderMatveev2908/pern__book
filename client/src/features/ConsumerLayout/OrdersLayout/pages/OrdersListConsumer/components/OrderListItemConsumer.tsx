import ItemID from "@/components/elements/cards/shared/spans/ItemID";
import ItemList from "@/components/elements/cards/shared/ItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";
import SpanInfoCard from "@/components/elements/cards/shared/spans/SpanInfoCard";
import { capt, formatD, isObjOk, priceFormatter } from "@/core/lib/lib";
import { OrderType } from "@/types/all/orders";
import { useMemo, type FC } from "react";
import { FaDatabase } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { TbDatabaseStar, TbPigMoney } from "react-icons/tb";

type PropsType = {
  o: OrderType;
};

const OrderListItemConsumer: FC<PropsType> = ({ o }) => {
  const images = useMemo(
    () =>
      (o.orderStores ?? [])
        .flatMap((os) =>
          (os.orderItemStores ?? []).flatMap((ois) => ois?.images?.[0])
        )
        .filter((el) => !!el),
    [o]
  );

  const isAvailable = useMemo(
    () =>
      o!.orderStores!.every(
        (os) =>
          (isObjOk(os.store) &&
            os.orderItemStores!.every((ois) => isObjOk(ois.book))) ||
          typeof o.orderedAt === "string"
      ),
    [o]
  );

  return (
    <div
      className={`card ${
        isAvailable ? "border-neutral-800" : "border-red-600"
      }`}
    >
      <div className="body_card">
        <ItemID {...{ ID: o.id }} />

        <ItemList {...{ images }}>
          <SpanInfoCard
            {...{
              spanInfo: {
                icon: TbPigMoney,
                label: priceFormatter(+o.amount - +o.discount),
              },
            }}
          />

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: FaDatabase,
                label: o.totItems,
              },
            }}
          />

          {typeof o.orderedAt === "string" && (
            <SpanInfoCard
              {...{
                spanInfo: {
                  icon: LuCalendarDays,
                  label: formatD(+o.orderedAt!),
                },
              }}
            />
          )}

          <SpanInfoCard
            {...{
              spanInfo: {
                icon: TbDatabaseStar,
                label: capt(o.stage),
              },
            }}
          />
        </ItemList>
      </div>

      <div className="footer_card">
        <PairBtnsLink
          {...{
            ids: [`/consumer/orders/${o.id}`],
            customStyleBtns: isAvailable
              ? null
              : ["border-red-600 hover:bg-red-600"],
          }}
        />
      </div>
    </div>
  );
};

export default OrderListItemConsumer;
