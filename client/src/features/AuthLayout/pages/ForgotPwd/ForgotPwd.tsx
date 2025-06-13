/* eslint-disable @typescript-eslint/no-explicit-any */
import EmailForm from "@/common/forms/EmailForm/EmailForm";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import { useMakeFormEmail } from "@/core/hooks/all/forms/email/useMakeFormEmail";
import { useWrapMutationAPI } from "@/core/hooks/hooks";
import { makeNoticeTxt } from "@/core/lib/lib";
import { useNotice } from "@/features/Notice/hooks/useNotice";
import { useSendEmailMutation } from "@/features/root/sendEmailSliceAPI";
import { SendMailEnd } from "@/types/types";
import type { FC } from "react";

const ForgotPwd: FC = () => {
  const form = useMakeFormEmail();
  const { handleSubmit, reset } = form;

  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const handleSave = handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        sendEmail({
          email: formData.email,
          endpoint: SendMailEnd.FORGOT_PWD,
        }),
    });

    if (!res) return;

    reset();
    makeNoticeCombo({
      status: res?.status || 200,
      msg: makeNoticeTxt("to recover your account"),
    });
  });

  return (
    <WrapperAuthPage {...{ title: "RECOVER ACCOUNT" }}>
      <EmailForm {...({ ...form, handleSave, isLoading } as any)} />
    </WrapperAuthPage>
  );
};

export default ForgotPwd;
