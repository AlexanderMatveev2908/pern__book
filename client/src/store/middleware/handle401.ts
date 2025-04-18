import { cg } from "@/lib/lib";
import apiSlice from "../apiSlice";
import { TagsAPI } from "@/types/types";
import authSlice from "@/features/AuthLayout/authSlice";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handle401 = (store: any) => (next: any) => (action: any) => {
  const { payload } = action;

  if (payload?.refreshed) {
    if (!store.getState().auth.isLogged)
      store.dispatch(authSlice.actions.login());

    cg("invalidate tags");
    store.dispatch(
      apiSlice.util.invalidateTags(
        Object.values(TagsAPI).map((val) => ({ type: val }))
      )
    );
  }

  cg("res middleware", action);

  return next(action);
};
