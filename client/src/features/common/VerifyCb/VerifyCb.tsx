import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import {
  useVerifyAccountMutation,
  useVerifyEmailForgotPwdMutation,
} from "./verifyCbSliceAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapMutationAPI } from "@/hooks/hooks";
import { checkQueryAuth, isObjOk, saveStorage } from "@/lib/lib";
import { AllowedFromApp, StorageKeys, TokenEventType } from "@/types/types";

const VerifyCb: FC = () => {
  const [searchParams] = useSearchParams();
  const hasRun = useRef<boolean>(false);
  const navigate = useNavigate();

  const params = useMemo(() => checkQueryAuth(searchParams), [searchParams]);

  const { wrapMutationAPI } = useWrapMutationAPI();

  const [verifyAccount] = useVerifyAccountMutation();
  const [verifyEmailForgotPwd] = useVerifyEmailForgotPwdMutation();

  const handleVerifyAccount = useCallback(async () => {
    if (params === null) return;

    const res = await wrapMutationAPI({
      cbAPI: () => verifyAccount(params),
      pushNotice: [true],
    });
    if (!isObjOk(res)) return;

    navigate("/", { replace: true });
  }, [params, verifyAccount, wrapMutationAPI, navigate]);

  const handleVerifyEmailForgotPwd = useCallback(async () => {
    if (params === null) return;

    const res = await wrapMutationAPI({
      cbAPI: () => verifyEmailForgotPwd(params),
      pushNotice: [true],
    });
    if (!isObjOk(res)) return;

    saveStorage({ data: params?.token, key: StorageKeys.FORGOT_PWD });

    navigate(
      `/auth/chose-new-pwd?userID=${params?.userID}&event=${params?.event}`,
      {
        replace: true,
        state: { from: AllowedFromApp.GEN },
      }
    );
  }, [params, verifyEmailForgotPwd, wrapMutationAPI, navigate]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      if (params?.event === TokenEventType.VERIFY_ACCOUNT)
        handleVerifyAccount();
      else if (params?.event === TokenEventType.FORGOT_PWD)
        handleVerifyEmailForgotPwd();
    }
  }, [params, handleVerifyAccount, handleVerifyEmailForgotPwd]);

  return <WrapPageAPI {...{ isLoading: true, canStay: !!params }} />;
};
export default VerifyCb;
