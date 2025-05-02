import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import authSlice from "@/features/AuthLayout/authSlice";
import noticeSlice from "@/features/Notice/noticeSlice";
import { middlewareErrors } from "./middleware/middlewareErrors";
import sidebarSlice from "@/features/common/Header/headerSlice";
import toastSlice from "@/features/common/Toast/toastSlice";
import popupSlice from "@/features/common/Popup/popupSlice";
import bookStoreSlice from "@/features/OwnerLayout/bookStoreSlice";

export const store = configureStore({
  reducer: {
    //  i give a custom name under which will be kept caching data, loading state and error handling
    appAPI: apiSlice.reducer,
    sidebar: sidebarSlice.reducer,
    auth: authSlice.reducer,
    toast: toastSlice.reducer,
    notice: noticeSlice.reducer,
    popup: popupSlice.reducer,

    bookStores: bookStoreSlice.reducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  //  by default redux pass middleware to serialize data of obj, loggers , async thunk and we keep them concatenating with our custom one
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(middlewareErrors),
});

//  we do like in use Context ,we need a type for rootState when we use useReducer that is sum of all reducers er have that modify global state, and the dispatch that is global but for commodity we give it just actions od the piece of state we work with in context but in reality dispatch is global cause when it dispatch actions the entrypoint of action to run depend only of his type not by imaginary borders we put to a reducer for organization,
export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
