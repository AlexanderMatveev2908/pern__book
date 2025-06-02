import { useContext } from "react";
import { SearchCtx } from "../SearchCtx";

export const useSearchCtx = () => {
  const ctx = useContext(SearchCtx);

  if (!ctx) throw new Error("Ctx must be consumed within a provider 😠");

  return ctx;
};
