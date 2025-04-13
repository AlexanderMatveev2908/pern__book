import { FC } from "react";
import { z } from "zod";
import { schemaEmail } from "../../../lib/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormType } from "../../../types/generalFields";
import { emailField } from "../../../config/fields/fields";
import WrapperInput from "../../../components/forms/components/inputs/WrapperInput";
import Button from "../../../components/common/buttons/Button/Button";
import Title from "../../../components/common/Title";

const schema = z.object({
  ...schemaEmail(),
});

const NewsLetter: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EmailFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleSave = handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <div className="w-full grid gap-8 sm:gap-4">
      <div className="justify-self-start">
        <Title {...{ title: "Newsletter", customStyle: "txt__4" }} />
      </div>
      <form
        onSubmit={handleSave}
        className="w-full grid sm:grid-cols-2 gap-5 items-center"
      >
        <WrapperInput
          {...{ register, errors, el: emailField, customSTyle: "input__icon" }}
        />

        <div className="max-w-[200px] justify-self-center sm:justify-self-start">
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
