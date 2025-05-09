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
  abs?: boolean;
};

const InfoBookStoreWorker: FC<PropsType> = ({ bookStore, abs }) => {
  return (
    <>
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.BOOKS),
          fields: statsBooks([0]),
          abs,
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
          fields: statsReviews([0]),
          abs,
        }}
      />
      <DropStats
        {...{
          el: labelDelivery,
          fields: statsDelivery(bookStore),
          abs,
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
          fields: statsOrders([0]),
          abs,
        }}
      />
    </>
  );
};

export default InfoBookStoreWorker;
