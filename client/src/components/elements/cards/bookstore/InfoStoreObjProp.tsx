import type { FC } from "react";
import DropStats from "../shared/Drop/DropStats";
import {
  fieldsStatsContact,
  labelDelivery,
  labelFieldAddressStore,
  labelFieldContact,
  statsAddress,
  statsDelivery,
} from "@/core/config/fieldsData/common/cards/bookStores/bookStores";
import { BookStoreType } from "@/types/all/bookStore";

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
