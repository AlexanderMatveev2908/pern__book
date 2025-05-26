import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsDelivery } from "@/core/config/fieldsData/OwnerLayout/bookStore/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryForm: FC = () => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <div className="sub_form">
      {fieldsDelivery.map((el) => (
        <FormField
          key={el.id}
          {...{
            el,
            register,
            errors,
            customCB:
              el.field === "deliveryPrice"
                ? () => trigger("freeDeliveryAmount")
                : null,
          }}
        />
      ))}
    </div>
  );
};

export default DeliveryForm;
