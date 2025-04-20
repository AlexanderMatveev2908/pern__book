import { NewPwdForm } from "@/components/components";
import { schemaPwd } from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const ChoseNewPwd: FC = () => {
  const form = useForm<NewPwdFormType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: null,
      confirmPassword: "",
    },
  });

  const handleSave = form.handleSubmit(async (formData) => {
    console.log(formData);
  });

  return <NewPwdForm {...{ ...form, isLoading: false, handleSave }} />;
};
export default ChoseNewPwd;
