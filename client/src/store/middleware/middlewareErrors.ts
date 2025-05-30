import { isRefreshing } from "@/core/lib/lib";
import authSlice from "@/features/AuthLayout/authSlice";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { handle401, handleLogoutWithAccessExp } from "./handle401";
import { handleErr403 } from "./handle403";
import { handle429 } from "./handle429";
import { AxiosResponse } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const middlewareErrors =
  (store: any) => (next: any) => (action: any) => {
    const { payload } = action as {
      payload: AxiosResponse & { refreshed: boolean };
    };

    const isLogged = store.getState().auth.isLogged;

    if (payload?.refreshed) {
      if (!isLogged) store.dispatch(authSlice.actions.login());
    }

    // i destructure res 200 cause i do not need config or more info but i need all I work with errors
    if (isRejectedWithValue(action)) {
      const { status, data, config } = (payload ?? {}) as AxiosResponse;

      if (status === 401 && data?.loggingOut) handleLogoutWithAccessExp(store);
      else if (status === 401 && isRefreshing(config?.url ?? ""))
        handle401({ store, err: payload });
      else if (status === 403) handleErr403({ store, err: payload });
      else if (status === 429) handle429(store, payload);

      return next(action);
    }

    return next(action);
  };
