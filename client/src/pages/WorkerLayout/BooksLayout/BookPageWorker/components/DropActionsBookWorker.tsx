/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsObj from "@/components/elements/cards/shared/DropActionsHOC/DropActionsObj";
import { manageDropLabelGeneral } from "@/core/config/fieldsData/common/general/labels";
import { actionsBookPageWorker } from "@/core/config/fieldsData/WorkerLayout/books/actions";
import { useDeleteBook } from "@/core/hooks/all/forms/books/useDeleteBook";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import { BookType } from "@/types/all/books";
import { UserRole } from "@/types/types";
import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  book?: BookType;
};

const DropActionsBookWorker: FC<PropsType> = ({ book }) => {
  const nav = useNavigate();

  const filteredActions = useMemo(
    () =>
      Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(actionsBookPageWorker).filter(([k, _]) => {
          switch (k) {
            case "delete":
              return (
                (book?.store?.team?.[0] as any)?.bookStoreUser?.role ===
                UserRole.MANAGER
              );

            default:
              return true;
          }
        })
      ),
    [book]
  );

  const [mutateDelete] = booksSliceWorkerAPI.useDeleteBookWorkerMutation();
  const { handleOpenPopup } = useDeleteBook({
    mutateDelete,
    _path: `/worker/book-stores/${book?.store?.id}`,
    ID: book?.id,
  } as any);

  const handlers = Object.fromEntries(
    Object.entries(filteredActions).map(([k, v]) => {
      switch (k) {
        case "store":
          return [k, () => nav(`${v.path}${book?.store?.id}`)];

        case "delete":
          return [k, handleOpenPopup];

        default:
          return [k, () => nav(`${v.path}${book?.id}`)];
      }
    })
  );

  // const handlers = useMemo(
  //   () => ({
  //     update: () => nav(`${filteredActions?.update?.path}${book?.id}`),
  //     delete: () => console.log("delete"),
  //     store: () => nav(filteredActions?.store?.path + book?.bookStoreID),
  //   }),
  //   [book, filteredActions, nav]
  // );

  return (
    <div className="w-full flex justify-end">
      <DropActionsObj
        {...{
          dropLabel: manageDropLabelGeneral,
          fields: filteredActions,
          handlers,
        }}
      />
    </div>
  );
};

export default DropActionsBookWorker;
