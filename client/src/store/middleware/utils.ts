/* eslint-disable @typescript-eslint/no-explicit-any */
import noticeSlice from "@/features/common/Notice/noticeSlice";
import { AllowedFromApp, EventApp, StorageKeys } from "@/types/types";
import { getMsgErr, goTo, removeStorage, saveStorage } from "@/lib/lib";
import toastSlice from "@/features/common/Toast/toastSlice";
import authSlice from "@/features/AuthLayout/authSlice";
import apiSlice from "../apiSlice";
import { clearAuthAxios } from "../baseAxiosQuery";

export const handlePushErr = ({
  store,
  response,
}: {
  store: any;
  response: any;
}) => {
  const { data, status } = response;

  const msg = getMsgErr(data);
  const newNotice = {
    notice: msg,
    type: EventApp.ERR,
    status: status || 500,
  };
  saveStorage({
    data: newNotice,
    key: StorageKeys.NOTICE,
  });

  if (data?.pushOut) {
    removeStorage();
    clearAuthAxios();

    store.dispatch(authSlice.actions.setPushedOut());
    store.dispatch(
      noticeSlice.actions.setNotice({
        ...newNotice,
        cb: () => {
          store.dispatch(apiSlice.util.resetApiState());
          store.dispatch(authSlice.actions.clearNavigating());
        },
      })
    );
  } else {
    store.dispatch(
      noticeSlice.actions.setNotice({
        ...newNotice,
      })
    );
  }

  store.dispatch(
    toastSlice.actions.openToast({
      type: EventApp.ERR,
      msg,
      statusCode: status,
    })
  );

  goTo("/notice", {
    replace: true,
    state: { from: AllowedFromApp.GEN },
  });

  return null;
};
