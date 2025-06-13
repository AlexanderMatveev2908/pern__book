/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFocus, useShowPwd, useWrapMutationAPI } from "@/core/hooks/hooks";
import { useEffect, useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { clearNavigating, getAuthState } from "../../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { schemaLogin } from "../../forms/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParamsLoginAPI, useLoginUserMutation } from "../../authSliceAPI";
import { isFormValid } from "@/core/lib/lib";
import apiSlice from "@/store/apiSlice";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import { preventBrowser } from "@/core/lib/all/forms/errPreSubmit/general";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import PwdField from "@/components/forms/inputs/PwdField/PwdField";
import Button from "@/components/elements/buttons/Button/Button";
import { emailField, passwordField } from "../../fields/auth";

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

const LoginPageContent: FC = () => {
  const navigate = useNavigate();

  const { wrapMutationAPI } = useWrapMutationAPI();

  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
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

            <PwdField {...{ control, errors, el: passwordField, ...mainPwd }} />

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

export default LoginPageContent;
