import QuickFillBtn from "@/components/common/buttons/QuickFillBtn";
import { FormField } from "@/components/components";
import { fieldsContact } from "@/config/fields/OwnerLayout/post";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const ContactForm: FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const keysUser = useMemo(() => ["email", "phone"], []);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
      {fieldsContact.map((el) => (
        <FormField {...{ el, register, errors }} />
      ))}

      <div className="w-full flex justify-center h-full items-end max-w-[300px] justify-self-center mt-3 sm:mt-0">
        <QuickFillBtn {...{ keysUser, setValue }} />
      </div>
    </div>
  );
};

export default ContactForm;
