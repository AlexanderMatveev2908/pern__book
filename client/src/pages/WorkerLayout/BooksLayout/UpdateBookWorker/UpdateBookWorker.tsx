/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useCheckEqDataBook } from "@/core/hooks/all/forms/books/useCheckEqDataBook";
import { usePopulateBookForm } from "@/core/hooks/all/forms/books/usePopulateBookForm";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { handleErrsBooks } from "@/core/lib/all/forms/errors/books";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { isObjOk } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { useEffect, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateBookWorker: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");

  const { createBookFormWorkerCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit, setFocus, watch, setValue } = formCtx;

  const res = booksSliceWorkerAPI.useGetBookWorkerQuery(
    { bookID: bookID! },
    {
      skip: !isValidID,
    }
  );
  useWrapQueryAPI({ ...res });
  const { isLoading, isError, error, data: { book } = {} } = res ?? {};
  const { store } = book ?? {};
  const [{ bookStoreUser: { role } = {} } = {}] = (store?.team as any) ?? [];

  const [mutate, { isLoading: isMutateLoading }] =
    booksSliceWorkerAPI.useUpdateBookWorkerMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (dataHook) => {
      const formData = makeBooksFormData(dataHook);

      const res = await wrapMutationAPI({
        cbAPI: () =>
          mutate({
            formData,
            bookID: bookID!,
          }),
      });

      if (!res) return;

      // nav(`/worker/books/${bookID!}`, { replace: true });
    },
    (errs) => {
      handleErrsBooks(errs, setFocus);
      return errs;
    }
  );

  useEffect(() => {
    if (isObjOk(store))
      setValue("bookStoreID", store!.id, { shouldValidate: true });
  }, [store, setValue]);

  usePopulateBookForm({
    setValue,
    book,
  });

  const { isSame } = useCheckEqDataBook({
    watch,
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
            <BookForm
              {...{
                handleSave,
                isPending: isMutateLoading,
                stores: [store as Partial<BookStoreType>],
                isDisabled: isSame,
                isEmployee: role !== UserRole.MANAGER,
              }}
            />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBookWorker;
