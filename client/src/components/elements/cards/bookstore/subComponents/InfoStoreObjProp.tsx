import type { FC } from "react";
import {
  fieldsStatsContact,
  labelDelivery,
  labelFieldAddressStore,
  labelFieldContact,
  statsAddress,
  statsDelivery,
} from "@/core/config/fieldsData/bookStores/cards";
import { BookStoreType } from "@/types/all/bookStore";
import DropStats from "../../../dropMenus/dropSimple/DropStats";

type PropsType = {
  bookStore?: BookStoreType;
  abs?: boolean;
  listen?: boolean;
};

const InfoStoreObjProp: FC<PropsType> = ({ bookStore, abs, listen }) => {
  return (
    <>
      <DropStats
        {...{
          el: labelFieldAddressStore,
          fields: statsAddress(bookStore),
          abs,
          listen,
        }}
      />

      <DropStats
        {...{
          el: labelFieldContact,
          fields: fieldsStatsContact(bookStore),
          abs,
          listen,
        }}
      />

      <DropStats
        {...{
          el: labelDelivery,
          fields: statsDelivery(bookStore),
          abs,
          listen,
        }}
      />
    </>
  );
};

export default InfoStoreObjProp;
