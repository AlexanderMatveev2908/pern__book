import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  BookFormType,
  SearchBooksOwnerType,
  SearchStoreFormType,
} from "./hooks/useFormsCtxProvider";

export type FormsCtxType = {
  formOwnerStoresCtx: UseFormReturn<SearchStoreFormType>;
  createBookFormCtx: UseFormReturn<BookFormType>;
  formOwnerBooksCtx: UseFormReturn<SearchBooksOwnerType>;
};

export const FormsCtx = createContext<null | FormsCtxType>(null);
