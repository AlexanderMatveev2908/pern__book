// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { makeSomething } from "@/features/AuthLayout/authSlice";
// // import { authAPI } from "@/features/AuthLayout/authSliceAPI";
// import {
//   cg,
//   formatMsgCode,
//   getStorage,
//   goTo,
//   isAccessExpired,
//   isRefreshing,
//   removeStorage,
//   saveStorage,
// } from "@/lib/lib";
// import { isRejectedWithValue } from "@reduxjs/toolkit";
// import apiSlice from "../apiSlice";
// import {
//   AllowedFromNotice,
//   EventApp,
//   MsgErrSession,
//   StorageKeys,
// } from "@/types/types";
// import toastSlice from "@/features/Toast/toastSlice";
// import noticeSlice from "@/features/Notice/noticeSlice";
// import authSlice from "@/features/AuthLayout/authSlice";
// import { appInstance } from "@/config/axios";

// const getMsg = (store: any, data: any) =>
//   [
//     MsgErrSession.REFRESH_INVALID,
//     MsgErrSession.REFRESH_NOT_PROVIDED,
//     MsgErrSession.REFRESH_INVALID,
//   ].includes(data?.msg)
//     ? formatMsgCode(data?.msg)
//     : data?.msg === MsgErrSession.REFRESH_EXPIRED ||
//       store.getState().auth.isLogged ||
//       getStorage(StorageKeys.ACCESS)
//     ? "session expired"
//     : data?.message ||
//       "The AI that manage the database has revolted and is taking control of all servers ⚙️";

// export const middlewareAuth = (store: any) => (next: any) => (action: any) => {
//   if (!isRejectedWithValue(action)) return next(action);
//   if (
//     action.payload.status !== 401 ||
//     !isAccessExpired(action.payload?.response?.data?.msg) ||
//     isRefreshing(action.payload.config.url)
//   )
//     return next(action);

//   const {
//     response: { data },
//     // config,
//   } = action.payload;

//   store
//     .dispatch((apiSlice.endpoints as any).refreshToken.initiate({}))
//     .unwrap()
//     .then((data: any) => {

//       saveStorage({ data: data.accessToken, key: StorageKeys.ACCESS });
//       appInstance.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${data?.accessToken}`;
//     })
//     .catch((err: any) => {
//       const { status, response: { data } = {} } = err ?? {};

//       removeStorage();

//       const message = getMsg(store, data);
//       const newNotice = {
//         notice: message,
//         type: EventApp.ERR,
//       };
//       saveStorage({ data: newNotice, key: StorageKeys.NOTICE });
//       store.dispatch(
//         noticeSlice.actions.setNotice({
//           ...newNotice,
//         })
//       );
//       goTo("/notice", { state: { from: AllowedFromNotice.EXP } });

//       store.dispatch(authSlice.actions.logout());
//       apiSlice.util.resetApiState();
//       store.dispatch(
//         toastSlice.actions.openToast({
//           msg: message,
//           type: EventApp.ERR,
//           statusCode: status,
//         })
//       );
//     });

//   const originalArgs = action.meta.arg.originalArgs;
//   const endpointName = action.meta.arg.endpointName;

//   store.dispatch(
//     (
//       apiSlice.endpoints[endpointName as keyof typeof apiSlice.endpoints] as any
//     ).initiate(originalArgs, { forceRefetch: true })
//   );
// };
