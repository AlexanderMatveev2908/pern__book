import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../store/store";
import { EventApp } from "@/types/types";

export interface ToastType {
  type: EventApp;
  msg: string;
  statusCode?: number;
}

export interface ToastStateType {
  isToastPrev: boolean;
  isToast: boolean;
  toast: ToastType | null;
}

const initState: ToastStateType = {
  isToastPrev: false,
  isToast: false,
  toast: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initState,
  reducers: {
    openToast: (state, action: PayloadAction<ToastType>) => {
      state.isToastPrev = state.isToast;
      state.isToast = true;
      state.toast = action.payload;
    },
    closeToast: (state) => {
      // reset just bool cause resetting text div would stretch resulting in an not optimal animation
      state.isToastPrev = false;
      state.isToast = false;
    },
    reopenToast: (state) => {
      state.isToastPrev = false;
      state.isToast = true;
    },
  },
});

export const { openToast, closeToast, reopenToast } = toastSlice.actions;
export const getToast = (state: RootStateType) => state.toast;

export default toastSlice.reducer;
