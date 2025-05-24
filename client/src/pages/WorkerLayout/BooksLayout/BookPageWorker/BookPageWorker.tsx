import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBookWorker from "./components/DropActionsBookWorker";

const BookPageWorker: FC = () => {
  const bookID = useParams()?.bookID;
  const itPass = REG_ID.test(bookID ?? "");

  const res = booksSliceWorkerAPI.useGetBookWorkerQuery({ bookID: bookID! });
  useWrapQueryAPI({ ...res });

  const { data: { book } = {} } = res ?? {};

  return (
    <WrapPageAPI
      {...{
        canStay: itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <div className="parent__form ">
        <Title {...{ title: book?.title }} />
        <DropActionsBookWorker {...{ book }} />
      </div>
    </WrapPageAPI>
  );
};

export default BookPageWorker;
