/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { keysFormBook } from "@/core/lib/all/forms/schemaZ/books";
import { __cg, isSameData } from "@/core/lib/lib";
import { BookType } from "@/types/all/books";
import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";

type Params = {
  watch: UseFormWatch<BookFormType>;
  book?: BookType;
};

export const useCheckEqDataBook = ({ watch, book }: Params) => {
  const [isSame, setIsSame] = useState(false);

  const vals = watch();

  useEffect(() => {
    const checkEquality = () => {
      if (!book) return;

      const original = keysFormBook.reduce((acc: any, curr) => {
        const val = (book as any)[curr];

        switch (curr) {
          case "images":
            acc[curr] = book?.images?.length
              ? book.images.map((el) => el.url)
              : null;
            break;

          default:
            acc[curr] =
              typeof val === "number" ? (+val ? val + "" : "") : val || null;
            break;
        }

        return acc;
      }, {});

      const updated = keysFormBook.reduce((acc: any, curr) => {
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

  return {
    isSame,
  };
};
