import { openToast } from "@/features/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useWrapAPI = () => {
  const dispatch = useDispatch();

  const wrapAPI = useCallback(
    async (cbAPI: () => any) => {
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

        return null;
      }
    },
    [dispatch]
  );

  return { wrapAPI };
};
