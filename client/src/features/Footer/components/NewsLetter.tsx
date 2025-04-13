import { FC } from "react";
import { z } from "zod";
import { schemaEmail } from "../../../lib/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormType } from "../../../types/generalFields";
import ErrorFormField from "../../../components/forms/components/inputs/ErrorFormField";
import { emailField } from "../../../config/fields/fields";

const schema = z.object({
  ...schemaEmail(),
});

const NewsLetter: FC = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<EmailFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  console.log(watch());

  return (
    <form className="w-full grid grid-cols-2">
      <div className="w-full grid">
        <label className="grid w-full gap-2">
          <div
            className="w-full flex relative
          "
          >
            <input
              type={emailField.type ?? "text"}
              placeholder={`Your ${emailField.label}...`}
              className="input__base txt__2"
              {...register(emailField.field as keyof EmailFormType)}
            />
            <ErrorFormField {...{ errors, el: emailField }} />
          </div>
        </label>
      </div>
    </form>
  );
};
export default NewsLetter;
