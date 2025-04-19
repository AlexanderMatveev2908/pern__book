import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { isFormValid, schemaEmail } from "../../../lib/lib";
import { useEffect, useState } from "react";

const schema = z
  .object({
    ...schemaEmail(),
  })
  .refine((data) => data.email.trim(), {
    message: "Email is required",
    path: ["email"],
  });

export const useMakeFormEmail = () => {
  const [isFormOk, setIsFormOk] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const vals = watch();

  useEffect(() => {
    setIsFormOk(isFormValid(errors, vals));
  }, [errors, vals, setIsFormOk]);

  return {
    register,
    errors,
    handleSubmit,
    watch,
    isFormOk,
  };
};
