import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";
import { useSendEmailMutation } from "../../root/sendEmailSliceAPI";
import { useNotice, useWrapMutationAPI } from "@/hooks/hooks";
import { SendMailEnd } from "@/types/types";
import { makeNoticeTxt } from "@/lib/lib";

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

    console.log(res);

    if (!res) return;

    reset();
    makeNoticeCombo({
      status: res?.status || 200,
      msg: makeNoticeTxt("to recover your account"),
    });
  });

  return <EmailForm {...{ ...form, handleSave, isLoading }} />;
};
export default ForgotPwd;
