import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import ActionsWorker from "./components/ActionsWorker";

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
  const { data: { bookStore } = {} } = res;

  return (
    <WrapPageAPI
      {...{
        canStay: itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <div
        className={`parent__form ${
          isObjOk(bookStore?.video) ? "mb-[-150px]" : ""
        }`}
      >
        <Title {...{ title: bookStore?.name }} />

        <ActionsWorker {...{ bookStore }} />
      </div>
    </WrapPageAPI>
  );
};

export default BookStorePageWorker;
