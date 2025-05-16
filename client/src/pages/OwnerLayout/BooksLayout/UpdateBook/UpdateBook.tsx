/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { useMergeInfoExistingBook } from "@/core/hooks/all/forms/books/useMergeInfoExistingBook";
import { useScroll } from "@/core/hooks/hooks";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const UpdateBook: FC = () => {
  useScroll();

  const { user, stores, isValidID, isPending, isErr, error, book } =
    useMergeInfoExistingBook();

  const formCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });
  const { handleSubmit, setValue } = formCtx;

  useEffect(() => {
    const populate = () => {
      if (!book) return;

      const keys = [
        "bookStoreID",
        "title",
        "author",
        "year",
        "description",
        "images",
        "qty",
        "price",
      ];

      for (const k of keys) {
        if (k === "images" && book?.images?.length)
          setValue(
            "images",
            book.images.map((img) => img.url),
            { shouldValidate: true }
          );
        else
          setValue(k as keyof BookFormType, (book as any)[k], {
            shouldValidate: true,
          });
      }
    };

    populate();
  }, [book, setValue]);

  const handleSave = handleSubmit(
    async (formDataHook) => {
      console.log(formDataHook);
    },
    (errs) => {
      console.log(errs);
    }
  );

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner && isValidID,
        isLoading: isPending,
        isError: isErr,
        error,
      }}
    >
      <div className="parent__page">
        <Title {...{ title: "update book" }} />

        <div className="w-full grid justify-items-center gap-6">
          <FormProvider {...formCtx}>
            <BookForm {...{ handleSave, isPending: false, stores }} />
          </FormProvider>
        </div>
      </div>
    </WrapPageAPI>
  );
};

export default UpdateBook;
