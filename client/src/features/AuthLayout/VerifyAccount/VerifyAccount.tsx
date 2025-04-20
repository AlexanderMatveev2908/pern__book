import { FC } from "react";
import { useMakeFormEmail } from "../../../hooks/all/forms/useMakeFormEmail";
import { EmailForm } from "@/components/components";
import { useDispatch } from "react-redux";
import { useSendEmailMutation } from "../sendEmailSliceAPI";
import { useWrapMutationAPI } from "@/hooks/hooks";
import {
  AllowedFromApp,
  EventApp,
  SendMailEnd,
  StorageKeys,
} from "@/types/types";
import { makeNoticeTxt, saveStorage } from "@/lib/lib";
import { setNotice } from "@/features/Notice/noticeSlice";
import { useNavigate } from "react-router-dom";

const VerifyAccount: FC = () => {
  const navigate = useNavigate();

  const form = useMakeFormEmail();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const dispatch = useDispatch();
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
    const notice = {
      notice: makeNoticeTxt("to verify your account"),
      type: EventApp.OK,
    };
    saveStorage({ data: notice, key: StorageKeys.NOTICE });
    dispatch(setNotice({ ...notice }));
    navigate("/notice", {
      replace: true,
      state: { from: AllowedFromApp.GEN },
    });
  });

  return <EmailForm {...{ ...form, handleSave, isLoading }} />;
};
export default VerifyAccount;
