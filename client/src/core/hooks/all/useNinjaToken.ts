import { useClearManageTokenMutation } from "@/features/root/rootAPI";
import { useWrapMutationAPI } from "../hooks";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "@/features/AuthLayout/authSlice";
import { useLocation } from "react-router-dom";
import { AuthState, StorageKeys } from "@/types/types";
import { __cg, delKeyStorage } from "@/core/lib/lib";
import { LinksLoggedDrop } from "@/core/config/fieldsData/general/fieldsActionsAuth";

export const useNinjaToken = () => {
  const { pathname } = useLocation();

  const authState: AuthState = useSelector(getAuthState);
  const [clearManageToken] = useClearManageTokenMutation();

  const { wrapMutationAPI } = useWrapMutationAPI();

  const deleteCall = useCallback(async () => {
    const res = await wrapMutationAPI({
      cbAPI: () => clearManageToken({}),
      showToast: false,
      hideErr: true,
    });

    __cg("expect 204", res);

    delKeyStorage(StorageKeys.SECURITY);
  }, [clearManageToken, wrapMutationAPI]);

  useEffect(() => {
    if (
      authState.isLogged &&
      authState.canManageAccount &&
      ![LinksLoggedDrop.MANAGE_ACCOUNT, LinksLoggedDrop.SECURITY].includes(
        pathname as LinksLoggedDrop
      )
    ) {
      deleteCall();
    }
  }, [authState, pathname, deleteCall]);
};
