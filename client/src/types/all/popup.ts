import { BtnAct } from "./buttons";

export interface BtnPopupType {
  cb: (() => void) | null;
  act: BtnAct;
  isPending: boolean;
  label: string;
}

export interface PopupStateType {
  isPopup: boolean | null;
  txt: string;
  leftBtn: BtnPopupType;
  rightBtn: BtnPopupType;
}

export type BtnPopupPayloadType = {
  label: string;
  cb?: () => void;
  act?: BtnAct;
  isPending?: boolean;
};

export type PayloadOpenPopup = {
  txt: string;
  leftBtn: BtnPopupPayloadType;
  rightBtn: BtnPopupPayloadType;
};

export enum BtnPopupKeys {
  LEFT = "leftBtn",
  RIGHT = "rightBtn",
}

export type PayloadLoadingPopup = BtnPopupKeys;
