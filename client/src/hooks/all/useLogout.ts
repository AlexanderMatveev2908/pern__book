import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useWrapMutationAPI } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoggingOut } from "@/features/AuthLayout/authSlice";
import { removeStorage } from "@/lib/lib";
import { clearAuthAxios } from "@/store/baseAxiosQuery";

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation({});

  const dispatch = useDispatch();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const handleCLick = useCallback(
    async (cbUI: () => void) => {
      const res = await wrapMutationAPI({ cbAPI: () => logoutUser({}) });

      cbUI();

      if (!res) return;

      removeStorage();
      clearAuthAxios();

      dispatch(setLoggingOut());

      navigate("/", { replace: true });
    },
    [logoutUser, navigate, wrapMutationAPI, dispatch]
  );

  return { handleCLick, isLoading };
};
