/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/BooksLayout/booksSliceWorkerAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBookWorker from "./components/DropActionsBookWorker";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import BookPage from "@/components/elements/cards/books/BookPage";
import WrapApp from "@/components/HOC/WrapApp";
import { isObjOk } from "@/core/lib/lib";

const BookPageWorker: FC = () => {
  const { user } = useGetU();

  const bookID = useParams()?.bookID;
  const itPass = REG_ID.test(bookID ?? "") && user?.isWorker;

  const res = booksSliceWorkerAPI.useGetBookWorkerQuery({ bookID: bookID! });
  useWrapQueryAPI({ ...res });

  const { data: { book } = {} } = res ?? {};
  const [{ bookStoreUser: { role } = {} } = {}] =
    book?.store?.team ?? ([] as any);

  return (
    <WrapApp
      {...{
        canStay: itPass,
        ...res,
        isSuccess: isObjOk(book),
      }}
    >
      {() => (
        <>
          <BreadCrumb
            {...{
              els: [
                {
                  label: role ?? "worker",
                  path: "#",
                },
                {
                  label: book?.store?.name ?? "Book store",
                  path: `/worker/book-stores/${book?.bookStoreID}`,
                },
                {
                  label: book?.title ?? "Book",
                  path: "#",
                },
              ],
            }}
          />

          <div className="p_form__1 ">
            <Title {...{ title: book?.title }} />

            <DropActionsBookWorker {...{ book }} />

            <BookPage
              {...{
                el: book!,
              }}
            />
          </div>
        </>
      )}
    </WrapApp>
  );
};

export default BookPageWorker;
