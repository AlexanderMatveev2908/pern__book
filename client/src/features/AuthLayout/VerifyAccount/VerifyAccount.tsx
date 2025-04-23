import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";
import { useSendEmailMutation } from "../sendEmailSliceAPI";
import { useNotice, useWrapMutationAPI } from "@/hooks/hooks";
import { SendMailEnd } from "@/types/types";
import { makeNoticeTxt } from "@/lib/lib";

const VerifyAccount: FC = () => {
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
export default VerifyAccount;
