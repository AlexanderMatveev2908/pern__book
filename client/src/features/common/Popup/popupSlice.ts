import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PopupStateType {}

const initState = {};

const popupSlice = createSlice({
  name: "popup",
  initialState: initState,
  reducers: {},
});

export default popupSlice;
