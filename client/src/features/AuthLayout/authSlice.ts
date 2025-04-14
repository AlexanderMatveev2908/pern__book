import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/all/user";
import { RootStateType } from "../../store/store";

const initState: AuthState = {
  isLogged: !!sessionStorage.getItem("accessToken"),
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
  },
});

export const { login, logout } = authSlice.actions;
export const getAuthState = (state: RootStateType) => state.auth;
export default authSlice.reducer;
