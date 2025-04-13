/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  fieldsAuth__0,
  fieldsAuth__1,
  groupFieldsByArea,
} from "../../../config/fields/fields.ts";
import ButtonsSwapper from "../../../components/forms/components/ButtonsSwapper/ButtonsSwapper";
import Terms from "./components/Terms";
import BreadCrumbForm from "../../../components/forms/components/BreadCrumbForm";
import Button from "../../../components/common/buttons/Button/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { REG_NAME } from "../../../config/regex";
import { useForm } from "react-hook-form";
import {
  getErrCurrSwap,
  getErrLen,
  schemaEmail,
  schemaPwd,
} from "../../../lib/lib.ts";
import CreatePwd from "../../../components/forms/components/CreatePwd";
import { useShowPwd } from "../../../hooks/all/forms/useShowPwd.ts";
import FormField from "../../../components/forms/components/inputs/FormField";
import PwdField from "../../../components/forms/components/inputs/PwdField/PwdField";
import WrapperFocus from "../../../components/forms/components/WrapperFocus/WrapperFocus.tsx";
import { useDispatch } from "react-redux";
import { openToast, ToastEventType } from "../../Toast/toastSlice";

const schema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is required")
      .max(30, "First Name must be less than 30 characters")
      .regex(REG_NAME, "Invalid First Name format"),
    lastName: z
      .string()
      .min(1, "Last Name is required")
      .max(30, "First Name must be less than 30 characters")
      .regex(REG_NAME, "Invalid Last Name format"),
    ...schemaEmail(),
    ...schemaPwd(),
    confirmPassword: z.string().min(1, "You must confirm your password"),
    terms: z.boolean().nullable(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email !== data.password, {
    message: "Email and Password must be different",
    path: ["password"],
  })
  .refine((data) => data.terms, {
    message: "You must accept the terms",
    path: ["terms"],
  });

type RegisterFormType = z.infer<typeof schema>;
const Register: FC = () => {
  const [currForm, setCurrFormBeforeCB] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm<RegisterFormType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "sss",
      lastName: "ss",
      email: "Matveevalexander470@gmail.com",
      password: "@2}mX_}^]3#lA^w5",
      confirmPassword: "@2}mX_}^]3#lA^w5",
      terms: true,
    },
    // defaultValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: null,
    //   confirmPassword: "",
    //   terms: null,
    // },
  });
  const handleSave = handleSubmit((formData) => {
    console.log(formData);
    dispatch(
      openToast({
        type: ToastEventType.OK,
        msg: "Registration successful",
      })
    );
  });

  const { mainPwd, confirmPwd, closeAllPwd } = useShowPwd();

  const vals = watch();
  const isDisabled = useMemo(() => getErrLen(errors, vals), [errors, vals]);

  useEffect(() => {
    const listenErr = () => {
      const currSwapKeys = groupFieldsByArea[currForm];
      let isValid = getErrCurrSwap(errors, currSwapKeys);

      if (isValid)
        for (const key in vals) {
          if (
            currSwapKeys.includes(key) &&
            (typeof (vals as any)[key] === "string"
              ? !(vals as any)[key].trim()
              : !vals[key as keyof RegisterFormType])
          ) {
            isValid = false;
            break;
          }
        }

      if (!isValid && !isNextDisabled) setIsNextDisabled(true);
      else if (isValid && isNextDisabled) setIsNextDisabled(false);
    };

    listenErr();
  }, [currForm, errors, isNextDisabled, vals]);

  const setCurrForm = useCallback(
    (val: number) => {
      closeAllPwd();
      setCurrFormBeforeCB(val);
    },
    [closeAllPwd]
  );

  const pwd = watch("password");

  return (
    <div className="parent__form">
      <BreadCrumbForm {...{ currForm, totLen: 2 }} />

      <div className="form__content">
        <form onSubmit={handleSave} className="w-full overflow-hidden p-6">
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
              {fieldsAuth__1.map((el, i) =>
                !i ? (
                  <WrapperFocus
                    key={el.id}
                    {...{ mainPwd, pwd, register, errors, el }}
                  />
                ) : (
                  <PwdField
                    key={el.id}
                    {...{
                      el,
                      register,
                      errors,
                      ...confirmPwd,
                    }}
                  />
                )
              )}

              <CreatePwd />

              <Terms {...{ setValue, watch, errors }} />
            </div>
          </div>

          <ButtonsSwapper
            {...{ currForm, setCurrForm, totLen: 2, isNextDisabled }}
          >
            <div className="max-w-[250px] justify-self-center">
              <Button
                {...{
                  isPending: false,
                  isDisabled: isDisabled || isNextDisabled,
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
