import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import sideReducer from "../features/Header/headerSlice";

export const store = configureStore({
  reducer: {
    //  i give a custom name under which will be kept caching data, loading state and error handling
    pernAPI: apiSlice.reducer,
    sidebar: sideReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  //  by default redux pass middleware to serialize data of obj, loggers , async thunk and we keep them concatenating with our custom one
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

//  we do like in use Context ,we need a type for rootState when we use useReducer that is sum of all reducers er have that modify global state, and the dispatch that is global but for commodity we give it just actions od the piece of state we work with in context but in reality dispatch is global cause when it dispatch actions the entrypoint of action to run depend only of his type not by imaginary borders we put to a reducer for organization,
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
