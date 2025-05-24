/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { keysFormBook } from "@/core/lib/all/forms/schemaZ/books";
import { BookType } from "@/types/all/books";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

type Params = {
  book?: BookType;
  setValue: UseFormSetValue<BookFormType>;
};

export const usePopulateBookForm = ({ setValue, book }: Params) => {
  useEffect(() => {
    const populate = () => {
      if (!book) return;

      for (const k of keysFormBook) {
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
  return {};
};
