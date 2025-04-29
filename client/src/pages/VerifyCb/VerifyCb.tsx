import {
  useVerifyAccountMutation,
  useVerifyEmailForgotPwdMutation,
  useVerifyNewEmailMutation,
} from "@/features/VerifyCb/verifyCbSliceAPI";
import { useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { checkQueryAuth, isObjOk } from "@/core/lib/lib";
import { AllowedFromApp, TokenEventType } from "@/types/types";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";

const VerifyCb: FC = () => {
  useScroll();

  const [searchParams] = useSearchParams();
  const hasRun = useRef<boolean>(false);
  const navigate = useNavigate();

  const params = useMemo(() => checkQueryAuth(searchParams), [searchParams]);

  const { wrapMutationAPI } = useWrapMutationAPI();

  const [verifyAccount] = useVerifyAccountMutation();
  const [verifyEmailForgotPwd] = useVerifyEmailForgotPwdMutation();
  const [verifyNewEmail] = useVerifyNewEmailMutation();

  // ACCOUNT_VERIFY
  const handleVerifyAccount = useCallback(async () => {
    if (params === null) return;

    const res = await wrapMutationAPI({
      cbAPI: () => verifyAccount(params),
      pushNotice: [true],
    });
    if (!isObjOk(res)) return;

    navigate("/", { replace: true });
  }, [params, verifyAccount, wrapMutationAPI, navigate]);

  // FORGOT_PWD
  const handleVerifyEmailForgotPwd = useCallback(async () => {
    if (params === null) return;

    const res = await wrapMutationAPI({
      cbAPI: () => verifyEmailForgotPwd(params),
      pushNotice: [true],
    });
    if (!isObjOk(res)) return;

    navigate(
      `/auth/chose-new-pwd?token=${params?.token}&userID=${params?.userID}&event=${params?.event}`,
      {
        replace: true,
        state: { from: AllowedFromApp.GEN },
      }
    );
  }, [params, verifyEmailForgotPwd, wrapMutationAPI, navigate]);

  // NEW_EMAIL_VERIFY
  const handleVerifyNewEmail = useCallback(async () => {
    if (params === null) return;

    const res = await wrapMutationAPI({
      cbAPI: () => verifyNewEmail(params),
      pushNotice: [true],
    });

    if (!isObjOk(res)) return;

    navigate("/", { replace: true });
  }, [navigate, params, verifyNewEmail, wrapMutationAPI]);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      if (params?.event === TokenEventType.VERIFY_ACCOUNT)
        handleVerifyAccount();
      else if (params?.event === TokenEventType.FORGOT_PWD)
        handleVerifyEmailForgotPwd();
      else if (params?.event === TokenEventType.CHANGE_EMAIL)
        handleVerifyNewEmail();
    }
  }, [
    params,
    handleVerifyAccount,
    handleVerifyEmailForgotPwd,
    handleVerifyNewEmail,
  ]);

  return <WrapPageAPI {...{ isLoading: true, canStay: !!params }} />;
};
export default VerifyCb;
