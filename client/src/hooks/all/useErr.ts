import { openToast, ToastEventType } from "@/features/Toast/toastSlice";
import { useDispatch } from "react-redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useErr = () => {
  const dispatch = useDispatch();

  const wrapAPI = async (cbAPI: () => any) => {
    try {
      const res = await cbAPI().unwrap();
      console.log(res);
    } catch (err: any) {
      const { data, status } = err;

      dispatch(
        openToast({
          type: ToastEventType.ERR,
          msg: data?.msg || "Something went wrong",
          statusCode: status || 500,
        })
      );
    }
  };

  return { wrapAPI };
};
