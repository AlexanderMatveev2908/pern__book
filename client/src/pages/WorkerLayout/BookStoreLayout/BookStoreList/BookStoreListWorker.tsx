import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";

const BookStoreListWorker: FC = () => {
  useScroll();

  const res = bookStoresWorkerSliceAPI.endpoints.getAllStoresWorker.useQuery();

  useWrapQueryAPI({ ...res });

  return <WrapPageAPI {...{ isLoading: res?.isLoading }}></WrapPageAPI>;
};

export default BookStoreListWorker;
