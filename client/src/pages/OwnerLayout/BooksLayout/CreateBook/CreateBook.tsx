/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useGetU } from "@/core/hooks/all/useGetU";
import { useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { useMemo, type FC } from "react";
import { FormProvider } from "react-hook-form";

const CreateBook: FC = () => {
  useScroll();

  const { createBookFormCtx: formCtx } = useFormCtxConsumer();
  const {
    user,
    isLoading: isUserLoading,
    error: userError,
    isError: isUserError,
  } = useGetU();

  const { handleSubmit, setFocus } = formCtx;
  const [mutate, { isLoading: isCreateLoading }] =
    booksSLiceAPI.endpoints.createBook.useMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeBooksFormData(formDataHook);

      const res = await wrapMutationAPI({
        cbAPI: () => mutate(formData),
      });

      if (!res) return;
    },
    (errs) => {
      if (errs?.store?.message) setFocus("store_a" as any);
      else if (errs?.images?.message) setFocus("images_a" as any);
      else if (errs?.categories?.message) setFocus("categories_a" as any);

      return errs;
    }
  );

  const {
    data: { stores } = {},
    isLoading: isStoresLoading,
    isError: isStoresError,
    error: storesError,
  } = booksSLiceAPI.endpoints.getStoresInfo.useQuery() ?? {};

  const isSomeErr = useMemo(
    () => isUserError || isStoresError,
    [isUserError, isStoresError]
  );
  const someErr = useMemo(
    () => userError || storesError,
    [userError, storesError]
  );
  const someonePending = useMemo(
    () => isUserLoading || isStoresLoading,
    [isUserLoading, isStoresLoading]
  );

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
        isError: isSomeErr,
        error: someErr,
        isLoading: someonePending,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "add book" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookForm {...{ handleSave, isPending: isCreateLoading, stores }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default CreateBook;
