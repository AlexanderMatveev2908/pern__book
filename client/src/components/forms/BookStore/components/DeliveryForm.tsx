import { FormField } from "@/components/components";
import { fieldsDelivery } from "@/config/fields/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryForm: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10">
      {fieldsDelivery.map((el) => (
        <FormField key={el.id} {...{ el, register, errors }} />
      ))}
    </div>
  );
};

export default DeliveryForm;
