import { useCallback } from "react";
import { useNotice } from "./useNotice";
import { __cg, delKeyStorage, isUnHandledErr } from "@/lib/lib";
import { StorageKeys } from "@/types/types";
import { AxiosResponse } from "axios";

export const useHandleDangerAccount = () => {
  const { makeNoticeCombo } = useNotice();

  const handleDanger = useCallback(
    (err: AxiosResponse) => {
      if (isUnHandledErr(err)) {
        __cg("run custom cb unhandled 401", err);
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
