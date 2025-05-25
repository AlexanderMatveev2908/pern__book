import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { useCheckEqDataBook } from "@/core/hooks/all/forms/books/useCheckEqDataBook";
import { useMergeInfoExistingBook } from "@/core/hooks/all/forms/books/useMergeInfoExistingBook";
import { usePopulateBookForm } from "@/core/hooks/all/forms/books/usePopulateBookForm";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { handleErrsBooks } from "@/core/lib/all/forms/errors/books";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UpdateBook: FC = () => {
  const nav = useNavigate();

  const { user, stores, bookID, isValidID, isPending, isErr, error, book } =
    useMergeInfoExistingBook();

  const formCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });
  const { handleSubmit, setFocus, watch, setValue } = formCtx;

  usePopulateBookForm({
    setValue,
    book,
  });

  const { isSame } = useCheckEqDataBook({
    watch,
    book,
  });

  const [mutate, { isLoading: isUpdateLoading }] =
    booksSLiceAPI.useUpdateBookMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const handleSave = handleSubmit(
    async (formDataHook) => {
      const formData = makeBooksFormData(formDataHook);
      const res = await wrapMutationAPI({
        cbAPI: () => mutate({ formData, bookID: bookID as string }),
      });

      if (!res) return;

      nav(`/owner/books/${book?.id ?? ""}`, { replace: true });
    },
    (errs) => {
      handleErrsBooks(errs, setFocus);
    }
  );

  return (
    <WrapPageAPI
      {...{
        canStay: user?.hasBooks && isValidID,
        isLoading: isPending,
        isError: isErr,
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
                isPending: isUpdateLoading,
                stores,
                isDisabled: isSame,
              }}
            />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBook;
