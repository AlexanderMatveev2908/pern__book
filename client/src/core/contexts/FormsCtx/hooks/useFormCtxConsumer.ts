import { useContext } from "react";
import { FormsCtx, FormsCtxType } from "../FormsCtx";

export const useFormCtxConsumer = (): FormsCtxType => {
  const ctx = useContext(FormsCtx);

  if (!ctx) throw new Error("Ctx must be consumed within a provider 😠");

  return ctx;
};
