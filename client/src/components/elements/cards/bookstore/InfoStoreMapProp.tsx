import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { KEY_MAP_STORE } from "@/core/config/fieldsData/labels/shared";
import {
  statsBooks,
  statsOrders,
  statsReviews,
} from "@/core/config/fieldsData/bookStores/cards";
import { labelsBookStore } from "@/features/OwnerLayout/bookStores/fields/actions";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  bookStore?: BookStoreType;
  abs?: boolean;
  listen?: boolean;
};

const InfoStoreMapProp: FC<PropsType> = ({ bookStore, abs, listen }) => {
  return (
    <>
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.BOOKS),
          fields: statsBooks(bookStore),
          abs,
          listen,
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
          fields: statsReviews(bookStore),
          abs,
          listen,
        }}
      />
      <DropStats
        {...{
          el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
          fields: statsOrders(bookStore),
          abs,
          listen,
        }}
      />
    </>
  );
};

export default InfoStoreMapProp;
