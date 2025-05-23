/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsMapObj from "@/components/elements/cards/shared/DropActionsHOC/DropActionsMapObj";
import {
  KEY_MAP_STORE,
  manageDropLabelGeneral,
} from "@/core/config/fieldsData/general/labels";
import { actionsBookStoreWorker } from "@/core/config/fieldsData/WorkerLayout/bookStores/actions";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";

type PropsType = {
  bookStore?: BookStoreType;
};

const ActionsWorker: FC<PropsType> = ({ bookStore }) => {
  const [{ bookStoreUser: { role } = {} } = {}] =
    bookStore?.team ?? ([] as any);

  const filteredArg = useMemo(
    () =>
      actionsBookStoreWorker.filter((el) => {
        switch (el.originalKey) {
          case KEY_MAP_STORE.BOOKS:
            return +(bookStore?.booksCount ?? 0);
          case KEY_MAP_STORE.ORDERS:
            return +(bookStore?.ordersCount ?? 0);
          case KEY_MAP_STORE.REVIEWS:
            return +(bookStore?.reviewsCount ?? 0) && role === UserRole.MANAGER;
          case KEY_MAP_STORE.UPDATE:
            return role === UserRole.MANAGER;
          case KEY_MAP_STORE.ADD_BOOK:
            return role === UserRole.MANAGER;

          default:
            return true;
        }
      }),
    [bookStore, role]
  );

  const handlers = new Map(
    Object.values(KEY_MAP_STORE).map((k) => [k, () => console.log(k)])
  );

  return !filteredArg.length ? null : (
    <div className="w-full flex justify-end">
      <DropActionsMapObj
        {...{
          dropLabel: manageDropLabelGeneral,
          fields: filteredArg,
          handlers,
        }}
      />
    </div>
  );
};

export default ActionsWorker;
