import { FC } from "react";
import { z } from "zod";
import { schemaEmail } from "../../../lib/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailFormType } from "../../../types/generalFields";
import ErrorFormField from "../../../components/forms/components/inputs/ErrorFormField";
import { emailField } from "../../../config/fields/fields";
import WrapperInput from "../../../components/forms/components/inputs/WrapperInput";

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
          <WrapperInput {...{ register, errors, el: emailField }} />
        </label>
      </div>
    </form>
  );
};
export default NewsLetter;
