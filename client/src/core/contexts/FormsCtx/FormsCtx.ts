import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  BookFormType,
  SearchBooksConsumerType,
  SearchBooksOwnerType,
  SearchBookStoreWorkerFormType,
  SearchBooksWorkerType,
  SearchStoreFormType,
} from "./hooks/useFormsCtxProvider";

export type FormsCtxType = {
  formOwnerStoresCtx: UseFormReturn<SearchStoreFormType>;
  createBookFormCtx: UseFormReturn<BookFormType>;
  formOwnerBooksCtx: UseFormReturn<SearchBooksOwnerType>;
  formWorkerBookStores: UseFormReturn<SearchBookStoreWorkerFormType>;
  createBookFormWorkerCtx: UseFormReturn<BookFormType>;
  formSearchBooksWorkerCtx: UseFormReturn<SearchBooksWorkerType>;
  formSearchBooksConsumerCtx: UseFormReturn<SearchBooksConsumerType>;
};

export const FormsCtx = createContext<null | FormsCtxType>(null);
