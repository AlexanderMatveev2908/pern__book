/* eslint-disable @typescript-eslint/no-explicit-any */

import { setNotice } from "@/features/Notice/noticeSlice";
import { openToast } from "@/features/Toast/toastSlice";
import { saveStorage } from "@/lib/lib";
import { AllowedFromNotice, EventApp, StorageKeys } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useWrapAPI = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const wrapAPI = useCallback(
    async ({
      cbAPI,
      push,
      pushNotice,
    }: {
      cbAPI: () => any;
      push?: boolean;
      pushNotice?: [boolean, (() => any)?];
    }) => {
      try {
        const { status, data } = await cbAPI().unwrap();
        dispatch(
          openToast({
            type: EventApp.OK,
            msg: data?.msg || "operation successful",
            statusCode: status,
          })
        );

        console.group("DATA API");
        console.log(data);
        console.groupEnd();

        return data;
      } catch (err: any) {
        const { response: { data, status } = {} } = err ?? {};

        console.group("ERR API");
        console.log(err);
        console.groupEnd();

        dispatch(
          openToast({
            type: EventApp.ERR,
            msg:
              data?.msg ||
              "The AI that manage the database has revolted and is taking control of all servers ⚙️",
            statusCode: status,
          })
        );

        console.log(pushNotice);

        if (push && pushNotice) {
          throw new Error("Can not send user to different places at same time");
        } else if (push) {
          navigate("/", { replace: true });
        } else if (pushNotice?.[0]) {
          dispatch(
            setNotice({
              notice: data?.msg,
              type: EventApp.ERR,
              cb: pushNotice?.[1] ?? null,
            })
          );

          saveStorage({
            data: { notice: data?.msg, type: EventApp.ERR },
            key: StorageKeys.NOTICE,
          });

          navigate("/notice", {
            replace: true,
            state: { from: AllowedFromNotice.VERIFY_ACCOUNT },
          });
        }

        return null;
      }
    },
    [dispatch, navigate]
  );

  return { wrapAPI };
};
