import { checkQueryAuth, schemaPwd } from "@/lib/lib";
import { AllowedFromApp } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { useFocus } from "../UI/useFocus";

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

export const useMakeFormChosePwd = () => {
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

  return { form, canStay, params };
};
