import type { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import { qtyFieldItem } from "@/core/config/fieldsData/shared/forms";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaRegCheckCircle } from "react-icons/fa";
import { BtnAct } from "@/types/types";
import { BsCartX } from "react-icons/bs";
import { REG_INT } from "@/core/config/regex";
import { z } from "zod";
import { CartItemType } from "@/types/all/Cart";

type PropsType = {
  el: CartItemType;
};

const schemaAtyForm = z.object({
  qty: z
    .string()
    .min(1, "qty is required")
    .max(10, "max length exceeded")
    .regex(REG_INT, "Invalid quantity format")
    .refine((val) => +(val ?? ""), {
      message: "Quantity must be at least 1",
    }),
});

type FormQtyType = z.infer<typeof schemaAtyForm>;

const FormQty: FC<PropsType> = ({ el }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormQtyType>({
    resolver: zodResolver(schemaAtyForm),
    mode: "onChange",
    defaultValues: {
      qty: el!.qty + "",
    },
  });

  const handleSave = handleSubmit(
    (data) => {
      console.log(data);
    },
    (errs) => {
      console.log(errs);
      return errs;
    }
  );

  return (
    <form
      onSubmit={handleSave}
      className="w-full items-center gap-x-4 justify-end grid grid-cols-2"
    >
      <div className="w-full flex justify-self-end">
        <FormField
          {...{
            control,
            errors,
            showLabel: false,
            el: qtyFieldItem,
            customStyle: "input__md",
          }}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-x-4 justify-items-center items-center">
        <div className="w-full max-w-[75px]">
          <ButtonIcon
            {...{
              el: {
                icon: FaRegCheckCircle,
              },
              act: BtnAct.DO,
              type: "submit",
            }}
          />
        </div>

        <div className="w-full max-w-[75px]">
          <ButtonIcon
            {...{
              el: {
                icon: BsCartX,
              },
              act: BtnAct.DEL,
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default FormQty;
