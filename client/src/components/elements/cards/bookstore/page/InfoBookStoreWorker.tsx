import {
  KEY_MAP_STORE,
  labelDelivery,
  labelsBookStore,
  statsBooks,
  statsDelivery,
  statsOrders,
  statsReviews,
} from "@/core/config/fieldsData/bookStore/actions";
import DropStats from "@/components/elements/cards/shared/DropStats";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";

type PropsType = {
  bookStore?: BookStoreType;
};

const InfoBookStoreWorker: FC<PropsType> = ({ bookStore }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.BOOKS),
          fields: statsBooks([0]),
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
          fields: statsReviews([0]),
        }}
      />
      <DropStats
        {...{
          el: labelDelivery,
          fields: statsDelivery(bookStore),
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
          fields: statsOrders([0]),
        }}
      />
    </div>
  );
};

export default InfoBookStoreWorker;
