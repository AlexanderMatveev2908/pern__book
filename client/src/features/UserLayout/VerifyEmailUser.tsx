import { EmailForm } from "@/components/components";
import { useMakeFormEmail } from "@/hooks/all/forms/useMakeFormEmail";
import { useNotice, useWrapMutationAPI } from "@/hooks/hooks";
import { FC } from "react";
import { useSendEmailMutation } from "../AuthLayout/sendEmailSliceAPI";
import { SendMailEnd } from "@/types/types";
import { makeNoticeTxt } from "@/lib/lib";

const VerifyEmailUser: FC = () => {
  const form = useMakeFormEmail();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const handleSave = form.handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        sendEmail({
          email: formData.email,
          endpoint: SendMailEnd.VERIFY_ACCOUNT,
        }),
    });

    if (!res) return;

    form.reset();
    makeNoticeCombo({
      status: res?.status || 200,
      msg: makeNoticeTxt("to verify your account"),
    });
  });

  return <EmailForm {...{ ...form, handleSave, isLoading }} />;
};
export default VerifyEmailUser;
