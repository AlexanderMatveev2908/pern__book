import {
  labelDelivery,
  labelsBookStore,
  statsBooks,
  statsDelivery,
  statsOrders,
  statsReviews,
} from "@/core/config/fieldsData/OwnerLayout/bookStore/actions";
import DropStats from "@/components/elements/cards/shared/Drop/DropStats";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { KEY_MAP_STORE } from "@/core/config/fieldsData/general/labels";

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
          fields: statsBooks(bookStore),
          abs,
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
          fields: statsReviews(bookStore),
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
          fields: statsOrders(bookStore),
          abs,
        }}
      />
    </>
  );
};

export default InfoBookStoreWorker;
