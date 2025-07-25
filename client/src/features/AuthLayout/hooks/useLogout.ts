import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoggingOut } from "@/features/AuthLayout/authSlice";
import { removeStorage } from "@/core/lib/lib";
import { clearAuthAxios } from "@/core/store/api/baseAxiosQuery";
import { useWrapMutationAPI } from "../../../core/hooks/all/wrappers/useWrapMutationAPI";

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation({});

  const dispatch = useDispatch();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const handleClick = useCallback(
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

  return { handleClick, isLoading };
};
