import { SwapCtxValsType } from "@/contexts/SwapAddress/useSwapAddress";
import { createContext, useContext } from "react";

export const ProfileCtx = createContext<SwapCtxValsType | null>(null);

export const useProfileCtx = (): SwapCtxValsType => {
  const ctx = useContext(ProfileCtx);

  if (!ctx) throw new Error("ctx must be consumed within a provider 🥴");

  return ctx as SwapCtxValsType;
};
