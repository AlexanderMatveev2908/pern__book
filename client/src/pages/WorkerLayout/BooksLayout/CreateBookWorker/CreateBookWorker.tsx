/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapMutationAPI, useWrapQueryAPI } from "@/core/hooks/hooks";
import { handleErrsBooks } from "@/core/lib/all/forms/errors/books";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { isObjOk } from "@/core/lib/lib";
import { booksSliceWorkerAPI } from "@/features/WorkerLayout/Books/booksSliceWorkerAPI";
import { BookStoreType } from "@/types/all/bookStore";
import { UserRole } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

type BookFormType = z.infer<typeof schemaBookForm>;

const CreateBookWorker: FC = () => {
  const storeID = useParams()?.bookStoreID;
  const isIdOk = REG_ID.test(storeID ?? "");

  const nav = useNavigate();

  const formCtx = useForm<BookFormType>({
    mode: "onChange",
    resolver: zodResolver(schemaBookForm),
  });
  const { handleSubmit, setValue, reset, setFocus } = formCtx;

  const [mutate, { isLoading }] =
    booksSliceWorkerAPI.endpoints.addBookWorker.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeBooksFormData(formDataHook);

      const res = await wrapMutationAPI({
        cbAPI: () =>
          mutate({
            data: formData,
            bookStoreID: storeID!,
          }),
      });

      if (!res) return;

      reset({});
      nav(`/worker/books/${res?.ID}`, { replace: true });
    },
    (errs) => {
      handleErrsBooks(errs, setFocus);
      return errs;
    }
  );

  const res = booksSliceWorkerAPI.useGetInfoStoreWorkerQuery(storeID!, {
    skip: !isIdOk,
  });
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res ?? {};
  const [{ bookStoreUser: { role } = {} } = {}] =
    bookStore?.team ?? ([] as any);

  useEffect(() => {
    if (isObjOk(bookStore))
      setValue("bookStoreID", bookStore?.id ?? "", { shouldValidate: true });
  }, [bookStore, setValue]);
  return (
    <WrapPageAPI
      {...{
        canStay: isIdOk && role === UserRole.MANAGER,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "add book" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookForm
              {...{
                handleSave,
                isPending: isLoading,
                stores: [bookStore as Partial<BookStoreType>],
              }}
            />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default CreateBookWorker;
