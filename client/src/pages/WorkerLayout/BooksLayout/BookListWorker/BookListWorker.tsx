import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useUpdateJoinCat } from "@/core/hooks/all/forms/books/useUpdateJoinCat";
import { __cg } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import type { FC } from "react";

const BookListWorker: FC = () => {
  const { formSearchBooksWorkerCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit, watch } = formCtx;
  const handleSave = handleSubmit(() => {
    __cg("submitted ✌🏼");
  });

  const { innerJoinedCat, setInnerJoinedCat } = useSearchCtx();

  useUpdateJoinCat({
    watch,
    innerJoinedCat,
    setInnerJoinedCat,
  });

  const hook = booksSliceWorkerAPI.useLazyGetAllBooksWorkerQuery();
  const res = hook[1];
  const { data: { books } = {} } = res ?? {};

  return (
    <WrapPageAPI>
      <div className="parent__page -mb-[175px]"></div>
    </WrapPageAPI>
  );
};

export default BookListWorker;
