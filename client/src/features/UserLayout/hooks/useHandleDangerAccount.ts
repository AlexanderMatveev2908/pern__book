import { useCallback } from "react";
import { __cg, delKeyStorage, isUnHandledErr } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";
import { AxiosResponse } from "axios";
import { useNotice } from "../../Notice/hooks/useNotice";

export const useHandleDangerAccount = () => {
  const { makeNoticeCombo } = useNotice();

  const handleDanger = useCallback(
    (err: AxiosResponse) => {
      if (isUnHandledErr(err)) {
        __cg("run custom cb 401", err);

        delKeyStorage(StorageKeys.SECURITY);
        makeNoticeCombo({
          status: err?.status,
          msg: err?.data?.msg,
        });
      }

      if (err?.status === 429) {
        __cg("run custom cb 429", err);
        delKeyStorage(StorageKeys.SECURITY);
      }
    },
    [makeNoticeCombo]
  );

  return {
    handleDanger,
  };
};
