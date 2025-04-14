import { openToast, ToastEventType } from "@/features/Toast/toastSlice";
import { useDispatch } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useWrapAPI = () => {
  const dispatch = useDispatch();

  const wrapAPI = async (cbAPI: () => any) => {
    try {
      const res = await cbAPI().unwrap();
      dispatch(
        openToast({
          type: ToastEventType.OK,
          msg: res?.msg,
        })
      );
      return res;
    } catch (err: any) {
      const { data, status = 500 } = err ?? {};

      dispatch(
        openToast({
          type: ToastEventType.ERR,
          msg: data?.msg || "Something went wrong",
          statusCode: status,
        })
      );
    }
  };

  return { wrapAPI };
};
