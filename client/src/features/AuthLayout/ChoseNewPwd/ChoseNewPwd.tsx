import { NewPwdForm, WrapPageAPI } from "@/components/components";
import {
  useMakeFormChosePwd,
  useNotice,
  useWrapMutationAPI,
} from "@/hooks/hooks";
import { FC, useCallback } from "react";
import { useChoseNewPwdMutation } from "../authSliceAPI";
import { useNavigate } from "react-router-dom";
import { delKeyStorage, isUnHandledErr } from "@/lib/lib";
import { StorageKeys } from "@/types/types";
import { AxiosResponse } from "axios";

const ChoseNewPwd: FC = () => {
  const navigate = useNavigate();

  const { form, canStay, params } = useMakeFormChosePwd();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const customErrCB = useCallback(
    (err: AxiosResponse) => {
      if (isUnHandledErr(err))
        makeNoticeCombo({
          status: err?.status,
          msg: err?.data?.msg,
        });
      if (err?.status === 429) delKeyStorage(StorageKeys.FORGOT_PWD);
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

    delKeyStorage(StorageKeys.FORGOT_PWD);

    navigate("/", { replace: true });
  });

  return (
    <WrapPageAPI {...{ canStay }}>
      <NewPwdForm {...{ ...form, isLoading, handleSave }} />
    </WrapPageAPI>
  );
};
export default ChoseNewPwd;
