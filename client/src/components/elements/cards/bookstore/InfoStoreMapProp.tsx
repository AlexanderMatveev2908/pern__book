import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { KEY_MAP_STORE } from "@/core/config/fieldsData/labels";
import {
  statsBooks,
  statsOrders,
  statsReviews,
} from "@/core/config/fieldsData/bookStores/cards";
import { labelsBookStore } from "@/features/OwnerLayout/fields/bookStore/actions";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  bookStore?: BookStoreType;
  abs?: boolean;
};

const InfoStoreMapProp: FC<PropsType> = ({ bookStore, abs }) => {
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
          el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
          fields: statsOrders(bookStore),
          abs,
        }}
      />
    </>
  );
};

export default InfoStoreMapProp;
