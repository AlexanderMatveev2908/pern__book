import { isRefreshing } from "@/lib/lib";
import authSlice from "@/features/AuthLayout/authSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { handle401, handleLogoutWithAccessExp } from "./handle401";
import { handlePushErr } from "./utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleErrStatus = (store: any) => (next: any) => (action: any) => {
  const { payload } = action;

  const isLogged = store.getState().auth.isLogged;

  if (payload?.refreshed) {
    if (!isLogged) store.dispatch(authSlice.actions.login());
  }

  // i destructure res 200 cause i do not need config or more info but i need all I work with errors
  if (isRejectedWithValue(action)) {
    const { response } = payload ?? {};
    const { status, data, config } = response ?? {};

    // i do not need `else if` cause in every i return
    if (status === 401 && data?.loggingOut) handleLogoutWithAccessExp(store);
    else if (status === 401 && isRefreshing(config?.url))
      handle401({ store, response });
    else if ([403, 429].includes(status)) handlePushErr({ store, response });

    return next(action);
  }

  return next(action);
};
