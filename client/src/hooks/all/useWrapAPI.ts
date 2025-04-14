import { openToast } from "@/features/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { useDispatch } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useWrapAPI = () => {
  const dispatch = useDispatch();

  const wrapAPI = async (cbAPI: () => any) => {
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
          msg: data?.msg || "Server was tired and take a coffee break ☕",
          statusCode: status,
        })
      );
    }
  };

  return { wrapAPI };
};
