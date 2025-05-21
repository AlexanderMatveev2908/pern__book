import { useSendEmailMutation } from "@/features/root/sendEmailSliceAPI";
import { useMakeFormEmail } from "@/core/hooks/all/forms/useMakeFormEmail";
import { useNotice, useScroll, useWrapMutationAPI } from "@/core/hooks/hooks";
import { makeNoticeTxt } from "@/core/lib/lib";
import { SendMailEnd } from "@/types/types";
import { FC } from "react";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import EmailForm from "@/common/forms/EmailForm/EmailForm";

const ForgotPwd: FC = () => {
  useScroll();
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
      <EmailForm {...{ ...form, handleSave, isLoading }} />
    </WrapperAuthPage>
  );
};
export default ForgotPwd;
