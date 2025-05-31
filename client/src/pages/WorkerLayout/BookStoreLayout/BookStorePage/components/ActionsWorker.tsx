/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsMapObj from "@/components/elements/cards/shared/DropActionsHOC/DropActionsMapObj";
import {
  KEY_MAP_STORE,
  manageDropLabelGeneral,
} from "@/core/config/fieldsData/labels";
import { actionsBookStoreWorker } from "@/features/WorkerLayout/fields/bookStores/actions";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  bookStore?: BookStoreType;
};

const ActionsWorker: FC<PropsType> = ({ bookStore }) => {
  const [{ bookStoreUser: { role } = {} } = {}] =
    bookStore?.team ?? ([] as any);

  const nav = useNavigate();

  const filteredArg = useMemo(
    () =>
      actionsBookStoreWorker.filter((el) => {
        switch (el.originalKey) {
          case KEY_MAP_STORE.BOOKS:
            return +(bookStore?.booksStats?.booksCount ?? 0);
          case KEY_MAP_STORE.ORDERS:
            return +(bookStore?.ordersStats?.ordersCount ?? 0);
          case KEY_MAP_STORE.REVIEWS:
            return (
              +(bookStore?.ratingStats?.reviewsCount ?? 0) &&
              role === UserRole.MANAGER
            );
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
    Object.values(KEY_MAP_STORE).map((k) => [
      k,
      () => {
        const curr = filteredArg.find((el) => el.originalKey === k);
        if (!curr) return null;

        switch (k) {
          default:
            return nav(curr.path + "/" + bookStore?.id);
        }
      },
    ])
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
