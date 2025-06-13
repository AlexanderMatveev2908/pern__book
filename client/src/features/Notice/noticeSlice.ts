/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage } from "@/core/lib/lib";
import { RootStateType } from "@/store/store";
import { EventApp, StorageKeys } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NoticeState {
  status: number;
  notice: string;
  type: EventApp;
  cb?: (() => any) | null;
}

const savedNotice = getStorage(StorageKeys.NOTICE);
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
export default noticeSlice;
