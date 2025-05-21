import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/all/user";
import { RootStateType } from "../../store/store";
import { getStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";

const initState: AuthState = {
  isLogged: !!getStorage(StorageKeys.ACCESS),
  canManageAccount: !!getStorage(StorageKeys.SECURITY),
  loggingOut: false,
  pushedOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    setLoggingOut: (state) => {
      state.loggingOut = true;
      state.isLogged = false;
    },
    setPushedOut: (state) => {
      state.pushedOut = true;
      state.isLogged = false;
    },
    clearNavigating: (state) => {
      state.pushedOut = false;
      state.loggingOut = false;
    },
    setCanManageAccount: (state, action: PayloadAction<boolean>) => {
      state.canManageAccount = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setLoggingOut,
  setPushedOut,
  clearNavigating,
  setCanManageAccount,
} = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
export default authSlice;
