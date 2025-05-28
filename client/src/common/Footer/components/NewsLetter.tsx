/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormType } from "../../../types/types.ts";
import { schemaEmail } from "@/core/lib/lib.ts";
import { useForm } from "react-hook-form";
import { emailField } from "@/core/config/fieldsData/AuthLayout/auth.ts";
import Title from "@/components/elements/Title.tsx";
import FormField from "@/components/forms/inputs/FormFields/FormField.tsx";
import Button from "@/components/elements/buttons/Button/Button.tsx";

const schema = z.object({
  ...schemaEmail(),
});

const NewsLetter: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<EmailFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleSave = handleSubmit(() => {});

  return (
    <div className="w-full grid gap-8 sm:gap-4">
      <div className="justify-self-start">
        <Title {...{ title: "Newsletter", styleTxt: "txt__4" }} />
      </div>
      <form
        onSubmit={handleSave}
        className="w-full grid sm:grid-cols-2 gap-5 items-center"
      >
        <FormField
          {...{
            control,
            errors,
            showLabel: false,
            el: emailField,
            customStyle: "input__md",
          }}
        />

        <div className="w-full max-w-[200px] justify-self-center sm:justify-self-start">
          <Button
            {...{
              label: "Subscribe",
              type: "submit",
              isPending: false,
              isDisabled: false,
            }}
          />
        </div>
      </form>
    </div>
  );
};
export default NewsLetter;
