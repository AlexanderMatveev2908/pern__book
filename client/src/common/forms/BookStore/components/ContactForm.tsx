import QuickFillBtn from "@/components/elements/buttons/QuickFillBtn";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsContact } from "@/core/config/fieldsData/OwnerLayout/bookStore/post";
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
    <div className="book_store_sub_form">
      {fieldsContact.map((el) => (
        <FormField key={el.id} {...{ el, register, errors }} />
      ))}

      <div className="w-full flex justify-center h-full items-end max-w-[300px] justify-self-center mt-3 sm:mt-0">
        <QuickFillBtn {...{ keysUser, setValue }} />
      </div>
    </div>
  );
};

export default ContactForm;
