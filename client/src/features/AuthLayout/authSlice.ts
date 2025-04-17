import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/all/user";
import { RootStateType } from "../../store/store";

const initState: AuthState = {
  isLogged: !!sessionStorage.getItem("accessToken"),
  test: "nothing",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
    makeSomething(state, action: PayloadAction<string>) {
      state.test = action.payload;
    },
  },
});

export const { login, logout, makeSomething } = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
export default authSlice;
