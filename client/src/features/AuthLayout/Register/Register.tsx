import { FC, useCallback } from "react";
import {
  fieldsAuth__0,
  fieldsAuth__1,
  swapFieldsByAreaAuth,
} from "../../../config/fields/AuthLayout/fieldsAuth.ts";
import ButtonsSwapper from "../../../components/forms/components/ButtonsSwapper/ButtonsSwapper";
import Terms from "./components/Terms";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isObjOk, makeNoticeTxt, schemaRegister } from "../../../lib/lib.ts";
import { useShowPwd } from "../../../hooks/all/forms/useShowPwd.ts";
import { RegisterParamsAPI, useRegisterUserMutation } from "../authSliceAPI.ts";
import { useFocus, useNotice, useWrapMutationAPI } from "@/hooks/hooks.ts";
import { useDispatch } from "react-redux";
import { login } from "../authSlice.ts";
import {
  BreadCrumbForm,
  Button,
  FormField,
  PairPwd,
} from "@/components/components.ts";
import { useFormSwap } from "@/hooks/all/forms/useSwapAddress/useFormSwap.ts";
import { preventBrowser } from "@/lib/all/forms/preSubmit/submit.ts";

type RegisterFormType = z.infer<typeof schemaRegister>;
const Register: FC = () => {
  const { mainPwd, confirmPwd, closeAllPwd } = useShowPwd();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
    reset,
    setFocus,
  } = useForm<RegisterFormType>({
    mode: "onChange",
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      // firstName: "alex",
      // lastName: "matveev",
      // email: "matveevalexander470@gmail.com",
      // password: "@2}mX_}^]3#lA^w5",
      // confirmPassword: "@2}mX_}^]3#lA^w5",
      // terms: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: null,
    },
  });
  useFocus({
    key: "firstName",
    setFocus,
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const registerCB = useCallback(() => dispatch(login()), [dispatch]);
  const handleSave = handleSubmit(async (formData) => {
    // eslint-disable-next-line
    const { confirmPassword: _, terms: __, ...newUser } = formData;

    const res = await wrapMutationAPI({
      cbAPI: () => registerUser(newUser as NonNullable<RegisterParamsAPI>),
    });

    if (!isObjOk(res)) return;

    reset();
    makeNoticeCombo({
      status: res?.status || 200,
      msg: makeNoticeTxt("to verify your account"),
      cb: registerCB,
    });
  });

  const pwd = watch("password");

  const { isFormOk, currForm, setCurrForm, isNextDisabled } = useFormSwap({
    fields: swapFieldsByAreaAuth,
    watch,
    errors,
    customSwapCB: closeAllPwd,
  });

  return (
    <div className="parent__form">
      <BreadCrumbForm {...{ currForm, totLen: 2 }} />

      <div className="form__content">
        <form
          onSubmit={(e) =>
            preventBrowser(e, async () => {
              closeAllPwd();
              await handleSave();
            })
          }
          className="w-full overflow-hidden p-6"
        >
          <div
            className={`w-[200%] flex transition-all duration-500 ${
              !currForm
                ? "max-h-[300px] min-h-[300px]"
                : "max-h-[350px] min-h-[350px]"
            }`}
            style={{
              transform: `translateX(-${currForm * 50}%)`,
            }}
          >
            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                !currForm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              {fieldsAuth__0.map((el) => (
                <FormField key={el.id} {...{ el, register, errors }} />
              ))}
            </div>
            <div
              className={`w-full grid gap-5 items-start h-fit el__flow ${
                currForm ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <PairPwd
                {...{
                  register,
                  errors,
                  mainPwd,
                  confirmPwd,
                  pwd,
                  fields: fieldsAuth__1,
                }}
              />

              <Terms {...{ setValue, watch, errors }} />
            </div>
          </div>

          <ButtonsSwapper
            {...{
              currForm,
              setCurrForm,
              totLen: 2,
              isNextDisabled,
            }}
          >
            <div className="max-w-[250px] justify-self-center">
              <Button
                {...{
                  isAging: isLoading,
                  isDisabled: !isFormOk || isNextDisabled,
                  label: "Register",
                }}
              />
            </div>
          </ButtonsSwapper>
        </form>
      </div>
    </div>
  );
};
export default Register;
