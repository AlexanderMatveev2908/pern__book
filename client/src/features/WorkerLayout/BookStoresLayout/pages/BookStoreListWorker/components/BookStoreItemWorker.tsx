/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";
import StoreItemList from "@/components/elements/cards/bookstore/StoreItemList";
import PairBtnsLink from "@/components/elements/cards/shared/PairBtnsLink";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItemWorker: FC<PropsType> = ({ el }) => {
  const [{ bookStoreUser: { role } = {} } = {}] = el?.team ?? ([] as any);

  const filtered = useMemo(
    () => [
      `/worker/book-stores/${el.id}`,
      ...(role === UserRole.MANAGER
        ? [`/worker/book-stores/update/${el.id}`]
        : [null]),
    ],
    [role, el.id]
  );

  return (
    <div className="card">
      <div className="body_card">
        <StoreItemList {...{ el, links: filtered }} />
      </div>

      <div className="footer_card">
        <PairBtnsLink {...{ ids: filtered }} />
      </div>
    </div>
  );
};

export default BookStoreItemWorker;
