import { FormField } from "@/components/components";
import { fieldsContact } from "@/config/fields/OwnerLayout/post";
import { FormBaseProps } from "@/types/types";
import { FC } from "react";

type PropsType = {} & FormBaseProps;

const ContactForm: FC<PropsType> = ({ register, errors }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
      {fieldsContact.map((el) => (
        <FormField {...{ el, register, errors }} />
      ))}
    </div>
  );
};

export default ContactForm;
