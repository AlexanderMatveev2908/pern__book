import { useSendEmailMutation } from "@/features/root/sendEmailSliceAPI";
import { useWrapMutationAPI } from "../../wrappers/useWrapMutationAPI";
import { makeNoticeTxt } from "@/core/lib/lib";
import { SendMailEnd } from "@/types/types";
import { useMakeFormEmail } from "./useMakeFormEmail";
import { useNotice } from "@/core/hooks/hooks";

export const useEmailVerifyAccount = (endpoint: SendMailEnd) => {
  const form = useMakeFormEmail();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const [sendEmail, { isLoading }] = useSendEmailMutation();

  const handleSave = form.handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        sendEmail({
          email: formData.email,
          endpoint,
        }),
    });

    if (!res) return;

    form.reset();
    makeNoticeCombo({
      status: res?.status || 200,
      msg: makeNoticeTxt("to verify your account"),
    });
  });

  return {
    form,
    isLoading,
    handleSave,
  };
};
