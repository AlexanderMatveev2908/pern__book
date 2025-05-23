import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const CreateBookWorker: FC = () => {
  const storeID = useParams()?.bookStoreID;
  const isIdOk = REG_ID.test(storeID ?? "");

  const res = booksSliceWorkerAPI.useGetInfoStoreWorkerQuery(storeID!, {
    skip: !isIdOk,
  });
  useWrapQueryAPI({ ...res });

  return (
    <WrapPageAPI
      {...{
        canStay: isIdOk,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    ></WrapPageAPI>
  );
};

export default CreateBookWorker;
