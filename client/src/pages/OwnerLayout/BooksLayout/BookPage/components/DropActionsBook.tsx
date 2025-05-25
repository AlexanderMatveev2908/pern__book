/* eslint-disable @typescript-eslint/no-explicit-any */
import DropActionsObj from "@/components/elements/cards/shared/DropActionsHOC/DropActionsObj";
import { manageDropLabelGeneral } from "@/core/config/fieldsData/general/labels";
import { actionsBookPage } from "@/core/config/fieldsData/OwnerLayout/books/actions";
import { useDeleteBook } from "@/core/hooks/all/forms/books/useDeleteBook";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
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
    () => ({
      delete: handleOpenPopup,
      update: () => nav(`/owner/books/update/${book.id}`),
    }),
    [book, nav, handleOpenPopup]
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
