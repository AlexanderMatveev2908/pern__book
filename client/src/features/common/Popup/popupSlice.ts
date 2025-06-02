import { RootStateType } from "@/store/store";
import {
  BtnAct,
  BtnPopupPayloadType,
  BtnPopupType,
  PayloadLoadingPopup,
  PayloadOpenPopup,
  PopupStateType,
} from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const partialDef = (btn: BtnPopupType) => ({
  ...btn,
  cb: null,
  isPending: false,
});

const defStateBtn = {
  cb: null,
  label: "",
  isPending: false,
  act: BtnAct.INFO,
};

const initState: PopupStateType = {
  isPopup: null,
  txt: "",
  leftBtn: defStateBtn,
  rightBtn: defStateBtn,
};

const applyProp = (payloadBtn: BtnPopupPayloadType): BtnPopupType =>
  Object.entries(payloadBtn).reduce(
    (acc, [key, val]) => ({
      ...acc,
      [key as keyof BtnPopupType]:
        val ??
        (key === "cb" ? null : key === "isPending" ? false : BtnAct.INFO),
    }),
    {} as BtnPopupType
  );

const popupSlice = createSlice({
  name: "popup",
  initialState: initState,
  reducers: {
    openPopup: (state, action: PayloadAction<PayloadOpenPopup>) => {
      const { txt, leftBtn, rightBtn } = action.payload;

      state.isPopup = true;
      state.txt = txt;
      state.leftBtn = applyProp(leftBtn);
      state.rightBtn = applyProp(rightBtn);
    },
    loadPop: (state, action: PayloadAction<PayloadLoadingPopup>) => {
      state[action.payload].isPending = true;
    },
    endLoadPop: (state, action: PayloadAction<PayloadLoadingPopup>) => {
      state[action.payload].isPending = false;
    },
    closePopup: (state) => {
      state.isPopup = false;
      state.leftBtn = partialDef(state.leftBtn);
      state.rightBtn = partialDef(state.rightBtn);
    },
  },
});

export const getPopup = (state: RootStateType) => state.popup;

export const { openPopup, loadPop, endLoadPop, closePopup } =
  popupSlice.actions;

export default popupSlice;
