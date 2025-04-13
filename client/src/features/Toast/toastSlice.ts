import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../store/store";

export enum ToastEventType {
  OK = "SUCCESS",
  ERR = "ERROR",
  INFO = "INFO",
}

export interface ToastType {
  type: ToastEventType;
  msg: string;
}

export interface ToastStateType {
  isToast: boolean;
  toast: ToastType | null;
}

const initState: ToastStateType = {
  isToast: false,
  toast: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initState,
  reducers: {
    openToast: (state, action: PayloadAction<ToastType>) => {
      state.isToast = true;
      state.toast = action.payload;
    },
    closeToast: (state) => {
      // reset just bool cause resetting text div would stretch resulting in an not optimal animation
      state.isToast = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export const getToast = (state: RootStateType) => state.toast;

export default toastSlice.reducer;
