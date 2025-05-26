/* eslint-disable @typescript-eslint/no-explicit-any */
import InfoCardStatsStore from "@/components/elements/cards/bookstore/itemList/InfoCardStatsStore";
import InfoCardStoreAllUsers from "@/components/elements/cards/bookstore/itemList/InfoCardStore/InfoCardStoreAllUsers";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksCardStoreWorker } from "@/core/config/fieldsData/WorkerLayout/bookStores/card";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemWorker: FC<PropsType> = ({ el }) => {
  const [{ bookStoreUser: { role } = {} } = {}] = el?.team ?? ([] as any);

  const filtered = useMemo(
    () =>
      linksCardStoreWorker.filter((lin) =>
        lin.label === "Update" ? role === UserRole.MANAGER : lin
      ),
    [role]
  );

  return (
    <div className="c_card">
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <InfoCardStoreAllUsers {...{ el }} />
          {role === UserRole.MANAGER && <InfoCardStatsStore {...{ el }} />}
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: filtered }} />
    </div>
  );
};

export default BookStoreItemWorker;
