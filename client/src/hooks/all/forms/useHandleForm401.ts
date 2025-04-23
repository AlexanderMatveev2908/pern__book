/* eslint-disable @typescript-eslint/no-explicit-any */
import { __cg, formatMsgCode } from "@/lib/lib";
import { MsgCheckToken } from "@/types/types";
import { useCallback } from "react";
import { useNotice } from "../UI/useNotice";

export const useHandleForm401 = () => {
  const { makeNoticeCombo } = useNotice();

  const handleForm401 = useCallback(
    (err: any) => {
      const { response: { data, status } = {} } = err ?? {};

      __cg("danger 401", data);
      if (
        status !== 401 ||
        ![
          ...Object.values(MsgCheckToken).map((message) =>
            formatMsgCode(message)
          ),
        ].includes(data?.msg)
      )
        return null;

      makeNoticeCombo({
        msg: data?.msg,
        status: 401,
      });

      return null;
    },
    [makeNoticeCombo]
  );

  return {
    handleForm401,
  };
};
