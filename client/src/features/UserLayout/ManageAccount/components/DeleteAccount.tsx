import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";
import {
  closePopup,
  loadPop,
  openPopup,
} from "@/features/common/Popup/popupSlice";
import { useNotice, useWrapMutationAPI } from "@/hooks/hooks";
import { BtnAct, BtnPopupKeys, StorageKeys } from "@/types/types";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useDeleteAccountMutation } from "../../userSliceAPI";
import { getStorage, removeStorage } from "@/lib/lib";
import { setLoggingOut } from "@/features/AuthLayout/authSlice";
import apiSlice from "@/store/apiSlice";
import { clearAuthAxios } from "@/store/baseAxiosQuery";

const el = {
  icon: Trash2,
  label: "Delete account",
};

const DeleteAccount: FC = () => {
  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteAccountMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const handleMainCLick = () => {
    dispatch(
      openPopup({
        txt: "Are you sure about deleting your account ?",
        leftBtn: {
          cb: async () => {
            dispatch(loadPop(BtnPopupKeys.LEFT));

            const res = await wrapMutationAPI({
              cbAPI: () =>
                deleteAccount({
                  token: getStorage(StorageKeys.SECURITY) ?? "",
                }),
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

      <div className="w-[250px] h-fit">
        <ButtonIcon
          {...{ act: BtnAct.DEL, el, handleCLick: handleMainCLick }}
        />
      </div>
    </div>
  );
};
export default DeleteAccount;
