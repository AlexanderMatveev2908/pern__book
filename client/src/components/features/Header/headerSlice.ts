import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    toggleSide: (state, action: PayloadAction<boolean>) => {
      state.isSideOpen = action.payload;
    },
    toggleSideNoPay: (state) => {
      state.isSideOpen = !state.isSideOpen;
    },
  },
});

export const { toggleSide, toggleSideNoPay } = sidebarSlice.actions;
export default sidebarSlice.reducer;
