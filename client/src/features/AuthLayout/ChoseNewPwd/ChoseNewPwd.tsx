import { NewPwdForm, WrapPageAPI } from "@/components/components";
import {
  useHandleForm401,
  useMakeFormChosePwd,
  useWrapMutationAPI,
} from "@/hooks/hooks";
import { FC } from "react";
import { useChoseNewPwdMutation } from "../authSliceAPI";
import { useNavigate } from "react-router-dom";

const ChoseNewPwd: FC = () => {
  const navigate = useNavigate();

  const { form, canStay, params } = useMakeFormChosePwd();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { handleForm401 } = useHandleForm401();

  const [choseNewPwd, { isLoading }] = useChoseNewPwdMutation();

  const handleSave = form.handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () =>
        choseNewPwd({
          password: formData.password as string,
          userID: params?.userID as string,
          token: params?.token as string,
        }),
      customErrCB: handleForm401,
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
