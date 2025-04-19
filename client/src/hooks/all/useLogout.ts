import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useWrapMutationAPI } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout, setLoggingOut } from "@/features/AuthLayout/authSlice";
import { removeStorage } from "@/lib/lib";
import { appInstance } from "@/config/axios";
import apiSlice from "@/store/apiSlice";

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

      navigate("/", { replace: true });

      removeStorage();
      appInstance.defaults.headers.common["Authorization"] = null;

      dispatch(setLoggingOut(true));
      dispatch(logout());
      dispatch(apiSlice.util.resetApiState());
    },
    [logoutUser, navigate, wrapMutationAPI, dispatch]
  );

  return { handleCLick, isLoading };
};
