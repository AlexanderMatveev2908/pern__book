import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/all/user";
import { RootStateType } from "../../store/store";

const initState: AuthState = {
  isLogged: !!sessionStorage.getItem("accessToken"),
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
  },
});

export const { login, logout, setLoggingOut, setPushedOut, clearNavigating } =
  authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
export default authSlice;
