/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useWrapMutationAPI } from "../../wrappers/useWrapMutationAPI";
import { useDispatch } from "react-redux";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { BtnAct, BtnPopupKeys } from "@/types/types";
import { useNavigate } from "react-router-dom";

type Params = {
  mutateDelete: any;
  _path: string;
  ID: string | number;
};

export const useDeleteBook = ({ mutateDelete, _path, ID }: Params) => {
  const dispatch = useDispatch();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const nav = useNavigate();

  const handleOpenPopup = useCallback(
    () =>
      dispatch(
        openPopup({
          txt: "Are You sure about deleting this book ?",
          leftBtn: {
            label: "Delete",
            act: BtnAct.DEL,
            cb: async () => {
              dispatch(loadPop(BtnPopupKeys.LEFT));

              const res = await wrapMutationAPI({
                cbAPI: () => mutateDelete(ID as string),
              });

              dispatch(closePopup());

              if (!res) return;

              nav(_path, { replace: true });
            },
          },
          rightBtn: {
            label: "Cancel",
            act: BtnAct.DO,
            cb: () => dispatch(closePopup()),
          },
        })
      ),
    [_path, ID, dispatch, mutateDelete, nav, wrapMutationAPI]
  );

  return {
    handleOpenPopup,
  };
};
