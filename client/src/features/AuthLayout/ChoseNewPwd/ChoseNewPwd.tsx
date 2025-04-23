/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPwdForm, WrapPageAPI } from "@/components/components";
import {
  useMakeFormChosePwd,
  useNotice,
  useWrapMutationAPI,
} from "@/hooks/hooks";
import { FC, useCallback } from "react";
import { useChoseNewPwdMutation } from "../authSliceAPI";
import { useNavigate } from "react-router-dom";
import { isUnHandledErr } from "@/lib/lib";

const ChoseNewPwd: FC = () => {
  const navigate = useNavigate();

  const { form, canStay, params } = useMakeFormChosePwd();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const customErrCB = useCallback(
    (res: any) => {
      if (isUnHandledErr(res))
        makeNoticeCombo({
          status: res?.status,
          msg: res?.data?.msg,
        });
    },
    [makeNoticeCombo]
  );

  const [choseNewPwd, { isLoading }] = useChoseNewPwdMutation();

  const handleSave = form.handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        choseNewPwd({
          password: formData.password as string,
          userID: params?.userID as string,
          token: params?.token as string,
        }),
      customErrCB,
    });

    if (!res) return;

    navigate("/", { replace: true });
  });

  return (
    <WrapPageAPI {...{ canStay }}>
      <NewPwdForm {...{ ...form, isLoading, handleSave }} />
    </WrapPageAPI>
  );
};
export default ChoseNewPwd;
