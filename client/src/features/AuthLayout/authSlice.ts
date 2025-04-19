import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.loggingOut = action.payload;
    },
    setPushedOut: (state, action: PayloadAction<boolean>) => {
      state.pushedOut = action.payload;
    },
  },
});

export const { login, logout, setLoggingOut, setPushedOut } = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
export default authSlice;
