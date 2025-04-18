import { __cg } from "@/lib/lib";
import authSlice from "@/features/AuthLayout/authSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handle401 = (store: any) => (next: any) => (action: any) => {
  const { payload } = action;

  const isLogged = store.getState().auth.isLogged;
  if (payload?.refreshed) {
    __cg("res middleware", action);

    if (!isLogged) store.dispatch(authSlice.actions.login());
  }

  return next(action);
};
