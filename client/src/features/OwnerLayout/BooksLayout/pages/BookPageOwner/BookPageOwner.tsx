import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import { booksSLiceAPI } from "../../booksSliceAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import DropActionsBook from "@/features/OwnerLayout/BooksLayout/pages/BookPageOwner/components/DropActionsBook";
import BookPage from "@/components/elements/cards/books/BookPage";
import WrapApp from "@/components/HOC/WrapApp";
import { BookType } from "@/types/all/books";
import { isObjOk } from "@/core/lib/lib";

const BookPageOwner: FC = () => {
  const { bookID = "" } = useParams();
  const itPass = REG_ID.test(bookID);

  const { user } = useGetU();

  const res = booksSLiceAPI.endpoints.getSingleBook.useQuery(bookID, {
    skip: !itPass,
  });
  const { data: { book } = {} } = res;
  useWrapQueryAPI({ ...res });

  return (
    <WrapApp
      {...{
        canStay: user?.hasBooks && itPass,
        ...res,
        isSuccess: isObjOk(book),
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                { label: "admin", path: "#" },
                { label: "Books", path: "/owner/books/list" },
                { label: book?.title ?? "book", path: "#" },
              ],
            }}
          />

          <div className="p_form__1 ">
            <Title {...{ title: book?.title }} />

            <DropActionsBook {...{ book: book as BookType }} />

            <BookPage {...{ el: book as BookType, isOwner: true }} />
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default BookPageOwner;
