import FormField from "@/components/forms/inputs/FormFields/FormField";
import { fieldsDelivery } from "@/core/config/fieldsData/general/forms/bookStores/postPut";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryForm: FC = () => {
  const {
    register,
    formState: { errors },
    trigger: triggerRHF,
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
                ? () => triggerRHF("freeDeliveryAmount")
                : null,
          }}
        />
      ))}
    </div>
  );
};

export default DeliveryForm;
