/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeSomething } from "@/features/AuthLayout/authSlice";
import { authAPI } from "@/features/AuthLayout/authSliceAPI";
import { isAccessExpired } from "@/types/all/API";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const middlewareAuth = (store: any) => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    if (action.payload.status === 401) {
      const { response: { data, config } = {} } = action.payload;
      // console.group("MIDDLEWARE APP");
      // console.log(data);
      // console.log(config);
      // console.groupEnd();

      if (isAccessExpired(data?.msg)) {
        store
          .dispatch(
            authAPI.endpoints.refreshToken.initiate({
              someContent: "some content",
            })
          )
          .unwrap()
          .then((res: any) => {
            // console.log(res);
            // store.dispatch(makeSomething("refresh"));

            const originalArgs = action.meta.arg.originalArgs;
            const endpointName = action.meta.arg.endpointName;

            console.log(originalArgs);
            console.log(endpointName);
            store.dispatch(
              authAPI.endpoints[
                endpointName as keyof typeof authAPI.endpoints
              ].initiate({ ...originalArgs, new: true })
            );

            // console.log(store.getState());
          })
          .catch((err: any) => {
            // console.log(err);
            // store.dispatch(makeSomething("it went wrong"));
            // console.log(store.getState());
          });
      }
    }
  }

  return next(action);
};
