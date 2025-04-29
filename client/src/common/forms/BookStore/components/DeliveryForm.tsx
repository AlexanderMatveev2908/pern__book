import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsDelivery } from "@/core/config/fieldsData/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="book_store_sub_form">
      {fieldsDelivery.map((el) => (
        <FormField key={el.id} {...{ el, register, errors }} />
      ))}
    </div>
  );
};

export default DeliveryForm;
