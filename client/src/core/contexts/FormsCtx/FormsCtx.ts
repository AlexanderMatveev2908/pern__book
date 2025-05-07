import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { SearchStoreFormType } from "./hooks/useFormsCtxProvider";

export type FormsCtxType = {
  formOwnerStoresCtx: UseFormReturn<SearchStoreFormType>;
};

export const FormsCtx = createContext<null | FormsCtxType>(null);
