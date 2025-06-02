import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../../../store/store";

export interface SidebarState {
  isSideOpen: boolean;
}

const initState: SidebarState = {
  isSideOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initState,
  reducers: {
    setIsSideOpen: (state, action: PayloadAction<boolean>) => {
      state.isSideOpen = action.payload;
    },
    toggleSide: (state) => {
      state.isSideOpen = !state.isSideOpen;
    },
  },
});

export const { setIsSideOpen, toggleSide } = sidebarSlice.actions;
export const getSIde = (state: RootStateType) => state.sidebar;
export default sidebarSlice;
