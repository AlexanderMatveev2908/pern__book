/* eslint-disable @typescript-eslint/no-explicit-any */
import noticeSlice from "@/features/Notice/noticeSlice";
import { AllowedFromNotice, EventApp, StorageKeys } from "@/types/types";
import { getMsgErr, goTo, saveStorage } from "@/lib/lib";
import toastSlice from "@/features/Toast/toastSlice";

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
  };

  store.dispatch(
    noticeSlice.actions.setNotice({
      ...newNotice,
    })
  );
  saveStorage({
    data: newNotice,
    key: StorageKeys.NOTICE,
  });

  store.dispatch(
    toastSlice.actions.openToast({
      type: EventApp.ERR,
      msg,
      statusCode: status,
    })
  );

  goTo("/notice", {
    replace: true,
    state: { from: AllowedFromNotice.GEN },
  });

  return null;
};
