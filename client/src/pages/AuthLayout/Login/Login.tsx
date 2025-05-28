/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocus, useShowPwd, useWrapMutationAPI } from "@/core/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiSlice from "@/store/apiSlice";
import { preventBrowser } from "@/core/lib/all/forms/preSubmit/submit";
import { isFormValid, schemaLogin } from "@/core/lib/lib";
import { clearNavigating, getAuthState } from "@/features/AuthLayout/authSlice";
import {
  ParamsLoginAPI,
  useLoginUserMutation,
} from "@/features/AuthLayout/authSliceAPI";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import PwdField from "@/components/forms/inputs/PwdField/PwdField";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import Button from "@/components/elements/buttons/Button/Button";
import {
  emailField,
  passwordField,
} from "@/core/config/fieldsData/AuthLayout/auth";

const schema = z
  .object({
    ...schemaLogin,
  })
  .refine((data) => data.email !== data.password, {
    message: "Email and Password can not be equal",
    path: ["password"],
  })
  .refine((data) => data.email.trim(), {
    message: "Email is required",
    path: ["email"],
  })
  .refine((data) => (data?.password ?? "").trim(), {
    message: "Password is required",
    path: ["password"],
  });

export type LoginFormType = z.infer<typeof schema>;

const Login: FC = () => {
  const navigate = useNavigate();

  const { wrapMutationAPI } = useWrapMutationAPI();

  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    control,
    setFocus,
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      // email: "matveevalexander470@gmail.com",
      // password: "@2}mX_}^]3#lA^w5",
      email: "",
      password: "",
    },
  });
  useFocus({
    key: "email",
    setFocus,
  });
  const vals = watch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSave = handleSubmit(async (formData) => {
    const res = await wrapMutationAPI({
      cbAPI: () => loginUser(formData as ParamsLoginAPI),
    });
    if (!res) return;
    reset();
    navigate("/", { replace: true });
  });

  const { mainPwd, closeAllPwd } = useShowPwd();

  const isFormOk = useMemo(() => isFormValid(errors, vals), [errors, vals]);

  useEffect(() => {
    if (authState.pushedOut) {
      dispatch(clearNavigating());
      dispatch(apiSlice.util.resetApiState());
    }
  }, [authState.pushedOut, dispatch]);
  return (
    <WrapperAuthPage {...{ title: "login" }}>
      <div className="p_form__1">
        <form
          onSubmit={(e) =>
            preventBrowser(e, async () => {
              closeAllPwd();
              await handleSave();
            })
          }
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   closeAllPwd();
          //   handleSave();
          // }}
          className="p_form__2"
        >
          <div className="w-full grid gap-5 p-6">
            <FormField {...({ control, errors, el: emailField } as any)} />

            <PwdField
              {...{ register, errors, el: passwordField, ...mainPwd }}
            />

            <div className="max-w-[250px] w-full justify-self-center mt-10">
              <Button
                {...{
                  label: "Login",
                  isDisabled: !isFormOk,
                  isAging: isLoading,
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </WrapperAuthPage>
  );
};
export default Login;
