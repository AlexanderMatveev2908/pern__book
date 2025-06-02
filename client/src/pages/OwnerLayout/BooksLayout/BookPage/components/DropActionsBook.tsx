/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsObj from "@/components/elements/dropMenus/dropActionsHOC/DropActionsObj";
import { manageDropLabelGeneral } from "@/core/config/fieldsData/labels";
import { useDeleteBook } from "@/core/hooks/all/forms/books/useDeleteBook";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { actionsBookPage } from "@/features/OwnerLayout/books/fields/actions";
import { BookType } from "@/types/all/books";
import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  book: BookType;
};

const DropActionsBook: FC<PropsType> = ({ book }) => {
  const nav = useNavigate();

  const [mutateDelete] = booksSLiceAPI.useDeleteBookMutation();

  const { handleOpenPopup } = useDeleteBook({
    mutateDelete,
    _path: `/owner/book-store/${book?.store?.id}`,
    ID: book.id,
  } as any);

  const handlers = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(actionsBookPage).map(([k, v]) => {
          switch (k) {
            case "delete":
              return [k, handleOpenPopup];

            case "store":
              return [k, () => nav(`/owner/book-store/${book?.store?.id}`)];

            default:
              return [k, () => nav(`${v.path}${book.id}`)];
          }
        })
      ),
    [nav, book, handleOpenPopup]
  );

  return (
    <div className="w-full flex justify-end">
      <DropActionsObj
        {...{
          dropLabel: manageDropLabelGeneral,
          fields: actionsBookPage,
          handlers,
        }}
      />
    </div>
  );
};

export default DropActionsBook;
