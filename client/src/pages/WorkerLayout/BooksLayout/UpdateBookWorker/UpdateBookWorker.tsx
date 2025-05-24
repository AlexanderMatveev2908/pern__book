/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { usePopulateBookForm } from "@/core/hooks/all/forms/books/usePopulateBookForm";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import { useEffect, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateBookWorker: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");

  const { createBookFormWorkerCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit, setValue } = formCtx;

  const res = booksSliceWorkerAPI.useGetBookWorkerQuery(
    { bookID: bookID! },
    {
      skip: !isValidID,
    }
  );
  useWrapQueryAPI({ ...res });
  const { isLoading, isError, error, data: { book } = {} } = res ?? {};
  const { store } = book ?? {};

  const handleSave = handleSubmit(
    (dataHook) => {},
    (errs) => {}
  );

  useEffect(() => {
    if (isObjOk(store))
      setValue("bookStoreID", store!.id, { shouldValidate: true });
  }, [store, setValue]);

  usePopulateBookForm({
    setValue,
    book,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: isValidID,
        isLoading,
        isError,
        error,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "update book" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookForm {...{ handleSave, isPending: false, stores: [store] }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookWorker;
