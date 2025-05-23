import InfoCardStatsStore from "@/components/elements/cards/bookstore/itemList/InfoCardStatsStore";
import InfoCardStoreAllUsers from "@/components/elements/cards/bookstore/itemList/InfoCardStore/InfoCardStoreAllUsers";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import LinksCard from "@/components/elements/cards/shared/LinksCard";
import { linksCardStoreWorker } from "@/core/config/fieldsData/WorkerLayout/bookStores/card";
import { BookStoreUserType } from "@/types/all/JunctionStoreUser";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";

type PropsType = {
  junction: BookStoreUserType;
};

const BookStoreItemWorker: FC<PropsType> = ({ junction }) => {
  const { bookStore: el } = junction;

  const filtered = useMemo(
    () =>
      linksCardStoreWorker.filter((el) =>
        el.label === "Update" ? junction.role === UserRole.MANAGER : el
      ),
    [junction]
  );

  return (
    <div className="child__card">
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
          {junction.role === UserRole.MANAGER && (
            <InfoCardStatsStore {...{ el }} />
          )}
        </div>
      </div>

      <LinksCard {...{ ID: el.id, links: filtered }} />
    </div>
  );
};

export default BookStoreItemWorker;
