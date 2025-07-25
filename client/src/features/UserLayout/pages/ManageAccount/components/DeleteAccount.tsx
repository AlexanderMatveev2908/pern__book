import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { BtnAct, BtnPopupKeys, StorageKeys } from "@/types/types";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { getStorage, removeStorage } from "@/core/lib/lib";
import { setLoggingOut } from "@/features/AuthLayout/authSlice";
import { clearAuthAxios } from "@/core/store/api/baseAxiosQuery";
import { useDeleteAccountMutation } from "@/features/UserLayout/userSliceAPI";
import { useHandleDangerAccount } from "@/features/UserLayout/hooks/useHandleDangerAccount";
import { useNotice } from "@/features/Notice/hooks/useNotice";
import apiSlice from "@/core/store/api/apiSlice";

const el = {
  icon: Trash2,
  label: "Delete account",
};

const DeleteAccount: FC = () => {
  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteAccountMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();
  const { handleDanger } = useHandleDangerAccount();

  const handleMainCLick = () => {
    dispatch(
      openPopup({
        txt: "Are you sure about deleting your account ?",
        leftBtn: {
          aria: "confirm delete account",
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.LEFT));

            const res = await wrapMutationAPI({
              cbAPI: () =>
                deleteAccount({
                  token: getStorage(StorageKeys.SECURITY) ?? "",
                }),
              customErrCB: handleDanger,
            });

            dispatch(closePopup());

            if (!res) return;

            removeStorage();
            clearAuthAxios();
            dispatch(setLoggingOut());

            makeNoticeCombo({
              msg: "Your account has successfully deleted",
              cb: () => dispatch(apiSlice.util.resetApiState()),
              status: res.status,
            });
          },
          label: "Delete account",
          act: BtnAct.DEL,
        },
        rightBtn: {
          cb: async () => {
            dispatch(closePopup());
          },
          label: "I change idea",
          act: BtnAct.DO,
        },
      })
    );
  };

  return (
    <div className="w-full grid grid-cols-1 justify-items-center items-start h-fit gap-8">
      <div className="">
        <span className="txt__2">This action is</span>
        <span className="txt__3 mx-2 pb_1 border-b-[3px] text-red-600">
          irreversible.
        </span>
        <div className="">
          <span className="txt__2">
            We will delete delete permanently all your data without any
            possibility of recover it
          </span>
        </div>
      </div>

      <div className="w-[300px] h-fit">
        <ButtonIcon
          {...{ act: BtnAct.DEL, el, handleClick: handleMainCLick }}
        />
      </div>
    </div>
  );
};
export default DeleteAccount;
