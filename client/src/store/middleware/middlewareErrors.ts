import { isRefreshing } from "@/lib/lib";
import authSlice from "@/features/AuthLayout/authSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { handle401, handleLogoutWithAccessExp } from "./handle401";
import { handleErr403 } from "./handle403";
import { handle429 } from "./handle429";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const middlewareErrors =
  (store: any) => (next: any) => (action: any) => {
    const { payload } = action;

    const isLogged = store.getState().auth.isLogged;

    if (payload?.refreshed) {
      if (!isLogged) store.dispatch(authSlice.actions.login());
    }

    // i destructure res 200 cause i do not need config or more info but i need all I work with errors
    if (isRejectedWithValue(action)) {
      const { response } = payload ?? {};
      const { status, data, config } = response ?? {};

      if (status === 401 && data?.loggingOut) handleLogoutWithAccessExp(store);
      else if (status === 401 && isRefreshing(config?.url))
        handle401({ store, response });
      else if (status === 403) handleErr403({ store, response });
      else if (status === 429) handle429(store, response);

      return next(action);
    }

    return next(action);
  };
