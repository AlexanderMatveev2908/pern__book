/* eslint-disable @typescript-eslint/no-explicit-any */
import { linksCardStoreWorker } from "@/features/WorkerLayout/BookStores/fields/card";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";
import StoreItemList from "@/components/elements/cards/bookstore/StoreItemList";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemWorker: FC<PropsType> = ({ el }) => {
  const [{ bookStoreUser: { role } = {} } = {}] = el?.team ?? ([] as any);

  const filtered = useMemo(
    () =>
      linksCardStoreWorker(el.id).filter((lin) =>
        lin.label === "Update" ? role === UserRole.MANAGER : lin
      ),
    [role, el.id]
  );

  return (
    <div className="item_business">
      <StoreItemList {...{ el, links: filtered }} />
    </div>
  );
};

export default BookStoreItemWorker;
