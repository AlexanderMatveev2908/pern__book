import { isStr } from "@/core/lib/lib";
import type { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";

const REG_COUPON = /.*/;

const schemaFormCoupon = z.object({
  code: z.string().refine((val) => !isStr(val) || REG_COUPON.test(val), {
    message: "Invalid code",
  }),
});

const couponField = {
  field: "code",
  place: "Coupon code...",
  label: "Coupon code",
};

type FormCouponType = z.infer<typeof schemaFormCoupon>;

const FormCoupon: FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormCouponType>({
    resolver: zodResolver(schemaFormCoupon),
    mode: "onChange",
  });

  return (
    <div className="w-full grid-cols-1 max-w-[600px] justify-self-center">
      <FormField {...{ control, errors, el: couponField }} />
    </div>
  );
};

export default FormCoupon;
