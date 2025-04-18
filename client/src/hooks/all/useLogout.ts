import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useWrapperAPI } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/features/AuthLayout/authSlice";
import { removeStorage } from "@/lib/lib";
import { appInstance } from "@/config/axios";
import apiSlice from "@/store/apiSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation({});

  const dispatch = useDispatch();

  const { wrapMutationAPI } = useWrapperAPI();
  const handleCLick = useCallback(
    async (cbUI: () => void) => {
      const res = await wrapMutationAPI({ cbAPI: () => logoutUser({}) });
      cbUI();

      dispatch(logout());
      removeStorage();
      appInstance.defaults.headers.common["Authorization"] = null;
      dispatch(apiSlice.util.resetApiState());

      if (res) navigate("/", { replace: true });
    },
    [logoutUser, navigate, wrapMutationAPI, dispatch]
  );

  return { handleCLick, isLoading };
};
