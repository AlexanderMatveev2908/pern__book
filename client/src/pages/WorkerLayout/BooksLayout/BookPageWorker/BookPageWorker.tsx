/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBookWorker from "./components/DropActionsBookWorker";
import { UserRole } from "@/types/types";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import InfoBookPage from "@/components/elements/cards/books/InfoBookPage";
import InfoBookAbout from "@/components/elements/cards/books/InfoBook/components/InfoBookAbout";
import DataBookDB from "@/components/elements/cards/books/InfoBook/components/DataBookDB";

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
    <WrapPageAPI
      {...{
        canStay: itPass,
        ...res,
      }}
    >
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

        <InfoBookPage
          {...{
            book: book!,
            hide: role !== UserRole.MANAGER,
            AboutBook: InfoBookAbout,
            BookDataDB: DataBookDB,
          }}
        />
      </div>
    </WrapPageAPI>
  );
};

export default BookPageWorker;
