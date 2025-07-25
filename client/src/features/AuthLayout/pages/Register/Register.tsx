/* eslint-disable @typescript-eslint/no-explicit-any */
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import WrapperAuthPage from "@/components/HOC/WrapperAuthPage";
import {
  useFocus,
  useNotice,
  useShowPwd,
  useWrapMutationAPI,
} from "@/core/hooks/hooks";
import { preventBrowser } from "@/core/lib/all/forms/errPreSubmit/general";
import { useCallback, useEffect, type FC } from "react";
import { schemaRegister } from "../../forms/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isObjOk, makeNoticeTxt } from "@/core/lib/lib";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import {
  fieldsAuth__0,
  fieldsAuth__1,
  swapFieldsByAreaAuth,
} from "../../fields/auth";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { SwapModeType } from "@/core/contexts/SwapCtx/ctx/initState";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import PairPwd from "@/components/forms/layouts/PairPwd/PairPwd";
import Terms from "./Terms";
import ButtonsSwapper from "@/components/forms/layouts/ButtonsSwapper/ButtonsSwapper";
import Button from "@/components/elements/buttons/Button/Button";
import { RegisterParamsAPI, useRegisterUserMutation } from "../../authSliceAPI";
import { login } from "../../authSlice";
import { z } from "zod";
import { useFormSwap } from "@/core/contexts/SwapCtx/ctx/hooks/useSwapForm";

type RegisterFormType = z.infer<typeof schemaRegister>;

const Register: FC = () => {
  const { mainPwd, confirmPwd, closeAllPwd } = useShowPwd();
  const { wrapMutationAPI } = useWrapMutationAPI();
  const { makeNoticeCombo } = useNotice();

  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
    reset,
    setFocus,
    trigger: triggerRHF,
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
      password: null,
      confirmPassword: "",
      terms: null,
    },
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

  const { currForm, setCurrForm, currSwapState, isNextDisabled } = useFormSwap({
    ...useSwapCtxConsumer(),
    fields: swapFieldsByAreaAuth,
    watch,
    errors,
    customSwapCB: closeAllPwd,
  });

  const { isFormOk } = useListenFormOk({
    errors,
    watch,
  });

  useEffect(() => {
    const handleSwapUI = () => {
      if (currSwapState !== SwapModeType.SWAPPED) return;

      if (!currForm) setFocus("firstName");
      else if (currForm) setFocus("password");
    };

    handleSwapUI();
  }, [currForm, currSwapState, setFocus]);
  useFocus({ setFocus, key: "firstName" });
  useCLearTab();

  return (
    <WrapperAuthPage {...{ title: "REGISTER" }}>
      <div className="p_form__1">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />

        <div className="p_form__2">
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
                  <FormField
                    key={el.id}
                    {...({ el, control, errors } as any)}
                  />
                ))}
              </div>
              <div
                className={`w-full grid gap-5 items-start h-fit el__flow ${
                  currForm ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <PairPwd
                  {...{
                    control,
                    errors,
                    mainPwd,
                    confirmPwd,
                    pwd,
                    fields: fieldsAuth__1,
                    customCbs: [
                      () => triggerRHF("confirmPassword"),
                      () => triggerRHF("password"),
                    ],
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
              <div className="w-full max-w-[225px] justify-self-center">
                <Button
                  {...{
                    aria: "register",
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
    </WrapperAuthPage>
  );
};

export default Register;
