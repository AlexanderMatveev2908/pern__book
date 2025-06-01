import type { FC } from "react";
import {
  fieldsStatsContact,
  labelDelivery,
  labelFieldAddressStore,
  labelFieldContact,
  statsAddress,
  statsDelivery,
} from "@/core/config/fieldsData/bookStores/bookStores";
import { BookStoreType } from "@/types/all/bookStore";
import DropStats from "../../dropMenus/dropSimple/DropStats";

type PropsType = {
  bookStore?: BookStoreType;
  abs?: boolean;
};

const InfoStoreObjProp: FC<PropsType> = ({ bookStore, abs }) => {
  return (
    <>
      <DropStats
        {...{
          el: labelFieldAddressStore,
          fields: statsAddress(bookStore),
          abs,
        }}
      />

      <DropStats
        {...{
          el: labelFieldContact,
          fields: fieldsStatsContact(bookStore),
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
    </>
  );
};

export default InfoStoreObjProp;
