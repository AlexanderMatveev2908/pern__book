import { useFocus, useNotice, useWrapMutationAPI } from "@/core/hooks/hooks";
import { checkQueryAuth, isUnHandledErr, schemaPwd } from "@/core/lib/lib";
import { AllowedFromApp } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { useCallback, useMemo, type FC } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useChoseNewPwdMutation } from "../../authSliceAPI";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import NewPwdForm from "@/common/forms/NewPwdForm/NewPwdForm";

const schema = z
  .object({
    ...schemaPwd(),
    confirmPassword: z.string().min(1, "You must confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type NewPwdFormType = z.infer<typeof schema>;

const ChoseNewPwd: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const params = useMemo(() => checkQueryAuth(searchParams), [searchParams]);
  const canStay = location.state?.from === AllowedFromApp.GEN && !!params;

  const form = useForm<NewPwdFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: null,
      confirmPassword: "",
    },
  });
  useFocus({
    setFocus: form.setFocus,
    key: "password",
  });

  const navigate = useNavigate();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const customErrCB = useCallback(
    (err: AxiosResponse) => {
      if (isUnHandledErr(err)) {
        makeNoticeCombo({
          status: err?.status,
          msg: err?.data?.msg,
        });
      }
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
    <WrapperAuthPage {...{ title: "RECOVER ACCOUNT", switchForm: false }}>
      <WrapPageAPI {...{ canStay }}>
        <NewPwdForm {...{ ...form, isLoading, handleSave }} />
      </WrapPageAPI>
    </WrapperAuthPage>
  );
};

export default ChoseNewPwd;
