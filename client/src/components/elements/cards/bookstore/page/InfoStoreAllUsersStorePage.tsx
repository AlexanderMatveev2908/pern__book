import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStats from "@/components/elements/cards/shared/Drop/DropStats";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import {
  categoriesStoreLabel,
  fieldsStatsContact,
  labelDelivery,
  labelDescription,
  labelFieldAddressStore,
  labelFieldContact,
  statsAddress,
  statsDelivery,
} from "@/core/config/fieldsData/cards/bookStores/bookStores";

type PropsType = {
  bookStore?: BookStoreType;
};

const InfoStoreAllUsersStorePage: FC<PropsType> = ({ bookStore }) => {
  const ids = useCreateIds({
    lengths: [bookStore?.categories?.length],
  });

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-x-10 gap-y-3">
        <DropStats {...{ el: categoriesStoreLabel, fields: null }}>
          {bookStore?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <DropStats
          {...{
            el: labelDescription,
            fields: null,
            styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
          }}
        >
          <li className="w-full flex justify-start">
            <span className="txt__2">{bookStore?.description ?? "N/A"}</span>
          </li>
        </DropStats>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3">
        <DropStats
          {...{
            el: labelFieldAddressStore,
            fields: statsAddress(bookStore),
          }}
        />

        <DropStats
          {...{
            el: labelFieldContact,
            fields: fieldsStatsContact(bookStore),
          }}
        />

        <DropStats
          {...{
            el: labelDelivery,
            fields: statsDelivery(bookStore),
          }}
        />
      </div>
    </>
  );
};

export default InfoStoreAllUsersStorePage;
