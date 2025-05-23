import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const BookStorePageWorker: FC = () => {
  useScroll();

  const bookStoreID = useParams()?.bookStoreID;
  const itPass = REG_ID.test(bookStoreID ?? "");
  const res = bookStoresWorkerSliceAPI.useGetSingleStoreWorkerQuery(
    bookStoreID!,
    {
      skip: !itPass,
    }
  );
  useWrapQueryAPI({ ...res });

  return (
    <WrapPageAPI
      {...{
        canStay: itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    ></WrapPageAPI>
  );
};

export default BookStorePageWorker;
