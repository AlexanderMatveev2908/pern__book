import QuickFillBtn from "@/components/elements/buttons/QuickFillBtn";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsContact } from "@/core/config/fieldsData/bookStores/forms";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  isDisabled?: boolean;
};

const ContactForm: FC<PropsType> = ({ isDisabled }) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  const keysUser = useMemo(() => ["email", "phone"], []);

  return (
    <div className="sub_form">
      {fieldsContact.map((el) => (
        <FormField key={el.id} {...{ el, control, errors, isDisabled }} />
      ))}

      {!isDisabled && (
        <div className="w-full flex justify-center h-full items-end max-w-[300px] justify-self-center mt-3 sm:mt-0">
          <QuickFillBtn {...{ keysUser, setValue }} />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
