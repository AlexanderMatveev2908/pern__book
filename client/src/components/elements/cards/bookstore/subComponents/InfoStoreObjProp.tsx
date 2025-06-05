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
  border?: boolean;
};

const InfoStoreObjProp: FC<PropsType> = ({
  bookStore,
  abs,
  listen,
  border,
}) => {
  return (
    <>
      <DropStats
        {...{
          el: labelFieldAddressStore,
          fields: statsAddress(bookStore),
          abs,
          listen,
          border,
        }}
      />

      <DropStats
        {...{
          el: labelFieldContact,
          fields: fieldsStatsContact(bookStore),
          abs,
          listen,
          border,
        }}
      />

      <DropStats
        {...{
          el: labelDelivery,
          fields: statsDelivery(bookStore),
          abs,
          listen,
          border,
        }}
      />
    </>
  );
};

export default InfoStoreObjProp;
