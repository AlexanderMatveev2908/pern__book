import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookFormType, SearchStoreFormType } from "./hooks/useFormsCtxProvider";

export type FormsCtxType = {
  formOwnerStoresCtx: UseFormReturn<SearchStoreFormType>;
  createBookFormCtx: UseFormReturn<BookFormType>;
};

export const FormsCtx = createContext<null | FormsCtxType>(null);
