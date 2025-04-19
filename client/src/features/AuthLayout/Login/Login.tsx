import { FC, useEffect, useMemo, useRef } from "react";
import { z } from "zod";
import { isFormValid, schemaLogin } from "../../../lib/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailField, passwordField } from "../../../config/fields/fields";
import { useShowPwd } from "../../../hooks/all/forms/useShowPwd";
import { Button, FormField, PwdField } from "@/components/components";
import { ParamsLoginAPI, useLoginUserMutation } from "../authSliceAPI";
import { useWrapMutationAPI } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, setPushedOut } from "../authSlice";
import apiSlice from "@/store/apiSlice";

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
    path: ["email"],
  });

export type LoginFormType = z.infer<typeof schema>;

const Login: FC = () => {
  const navigate = useNavigate();
  const hasRunCB = useRef<boolean>(false);

  const { wrapMutationAPI } = useWrapMutationAPI();

  const authState = useSelector(getAuthState);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "matveevalexander470@gmail.com",
      password: "@2}mX_}^]3#lA^w5",
    },
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

  const { mainPwd } = useShowPwd();

  const isFormOk = useMemo(() => isFormValid(errors, vals), [errors, vals]);

  useEffect(() => {
    if (authState.pushedOut && !hasRunCB.current) {
      hasRunCB.current = true;
      dispatch(setPushedOut(false));
      apiSlice.util.resetApiState();
    }
  }, [authState.pushedOut, dispatch]);
  return (
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <PwdField {...{ register, errors, el: passwordField, ...mainPwd }} />

          <div className="max-w-[250px] w-full justify-self-center mt-10">
            <Button
              {...{ label: "Login", isDisabled: !isFormOk, isAging: isLoading }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
