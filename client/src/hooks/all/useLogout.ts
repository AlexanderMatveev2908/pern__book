import { useLogoutUserMutation } from "@/features/AuthLayout/authSliceAPI";
import { useWrapperAPI } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useLogout = () => {
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutUserMutation({});

  const { wrapMutationAPI } = useWrapperAPI();
  const handleCLick = useCallback(
    async (cbUI: () => void) => {
      const res = await wrapMutationAPI({ cbAPI: () => logoutUser({}) });
      cbUI();

      if (res) navigate("/", { replace: true });
    },
    [logoutUser, navigate, wrapMutationAPI]
  );

  return { handleCLick, isLoading };
};
