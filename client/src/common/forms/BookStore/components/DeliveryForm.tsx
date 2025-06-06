import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import { fieldsDelivery } from "@/core/config/fieldsData/bookStores/forms";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const DeliveryForm: FC = () => {
  const {
    control,
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
            styleLabel: el.field === "deliveryTime" ? "text-green-600" : "",
            control,
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
