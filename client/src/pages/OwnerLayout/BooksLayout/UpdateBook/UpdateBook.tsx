/* eslint-disable @typescript-eslint/no-explicit-any */
import BookForm from "@/common/forms/BookForm/BookForm";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { useMergeInfoExistingBook } from "@/core/hooks/all/forms/books/useMergeInfoExistingBook";
import { useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { handleErrsBooks } from "@/core/lib/all/forms/errors/books";
import { makeBooksFormData } from "@/core/lib/all/forms/formatters/books";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { __cg, isSameData } from "@/core/lib/lib";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const keysForm = [
  "bookStoreID",
  "title",
  "author",
  "year",
  "description",
  "categories",
  "images",
  "qty",
  "price",
];

const UpdateBook: FC = () => {
  useScroll();

  const nav = useNavigate();

  const [isSame, setIsSame] = useState(false);

  const { user, stores, bookID, isValidID, isPending, isErr, error, book } =
    useMergeInfoExistingBook();

  const formCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });
  const { handleSubmit, setFocus, watch, setValue } = formCtx;

  useEffect(() => {
    const populate = () => {
      if (!book) return;

      for (const k of keysForm) {
        const val = (book as any)[k];

        if (k === "images" && val?.length) {
          setValue(
            "images",
            val.map((img: any) => img.url),
            { shouldValidate: true }
          );
        } else {
          setValue(
            k as keyof BookFormType,
            typeof val === "number" ? val + "" : val ?? "",
            {
              shouldValidate: true,
            }
          );
        }
      }
    };

    populate();
  }, [book, setValue]);

  const vals = watch();

  useEffect(() => {
    const checkEquality = () => {
      if (!book) return;

      const original = keysForm.reduce((acc: any, curr) => {
        const val = (book as any)[curr];

        switch (curr) {
          case "images":
            acc[curr] = book?.images?.length
              ? book.images.map((el) => el.url)
              : null;
            break;

          default:
            acc[curr] = typeof val === "number" ? val + "" : val || null;
            break;
        }

        return acc;
      }, {});

      const updated = keysForm.reduce((acc: any, curr) => {
        const val = vals[curr as keyof BookFormType];

        acc[curr] = Array.isArray(val)
          ? val.length
            ? val
            : null
          : val || null;

        return acc;
      }, {});

      const areSameVals = isSameData(original, updated);

      __cg("comparison", original, updated, isSame);
      if (areSameVals !== isSame) setIsSame(areSameVals);
    };

    checkEquality();
  }, [book, vals, isSame]);

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
