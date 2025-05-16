/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useMergeInfoBookForm } from "@/core/hooks/all/forms/useMergeInfoBookForm";
import { useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateBook: FC = () => {
  useScroll();

  const nav = useNavigate();

  const { createBookFormCtx: formCtx } = useFormCtxConsumer();

  const { user, stores, isSomeErr, someErr, someonePending } =
    useMergeInfoBookForm();

  const { handleSubmit, setFocus, reset } = formCtx;
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

      reset({});
      nav("/owner/books/list");
    },
    (errs) => {
      if (errs?.store?.message) setFocus("store_a" as any);
      else if (errs?.images?.message) setFocus("images_a" as any);
      else if (errs?.categories?.message) setFocus("categories_a" as any);

      return errs;
    }
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
