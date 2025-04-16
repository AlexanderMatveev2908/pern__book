/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage } from "@/lib/lib";
import { RootStateType } from "@/store/store";
import { EventApp } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoticeState {
  notice: string;
  type: EventApp;
  cb?: (() => any) | null;
}

const savedNotice = getStorage("notice");
const initState: NoticeState = savedNotice
  ? {
      ...JSON.parse(savedNotice),
      cb: null,
    }
  : {
      notice: "",
      type: EventApp.OK,
      cb: null,
    };

const noticeSlice = createSlice({
  name: "notice",
  initialState: initState,
  reducers: {
    setNotice: (_, action: PayloadAction<NonNullable<NoticeState>>) =>
      action.payload,
  },
});

export const { setNotice } = noticeSlice.actions;
export const getNoticeState = (state: RootStateType) => state.notice;
export default noticeSlice.reducer;
