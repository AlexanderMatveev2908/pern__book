/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsObj from "@/components/elements/cards/shared/DropActionsHOC/DropActionsObj";
import { manageDropLabelGeneral } from "@/core/config/fieldsData/general/labels";
import { actionsBookPageWorker } from "@/core/config/fieldsData/WorkerLayout/books/actions";
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

  const handlers = useMemo(
    () => ({
      update: () => nav(`/worker/books/put/${book?.id}`),
      delete: () => console.log("delete"),
    }),
    [book?.id, nav]
  );

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
