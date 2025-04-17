import { FC } from "react";
import { z } from "zod";
import { schemaLogin } from "../../../lib/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailField, passwordField } from "../../../config/fields/fields";
import { useShowPwd } from "../../../hooks/all/forms/useShowPwd";
import { Button, FormField, PwdField } from "@/components/components";

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
  });

export type LoginFormType = z.infer<typeof schema>;

const Login: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const handleSave = handleSubmit(() => {});

  const { mainPwd } = useShowPwd();

  return (
    <div className="parent__form">
      <form onSubmit={handleSave} className="form__content">
        <div className="w-full grid gap-5 p-6">
          <FormField {...{ register, errors, el: emailField }} />

          <PwdField {...{ register, errors, el: passwordField, ...mainPwd }} />

          <div className="max-w-[250px] w-full justify-self-center mt-10">
            <Button
              {...{ label: "Login", isDisabled: false, isPending: false }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
