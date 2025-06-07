/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressForm from "@/common/forms/AddressForm/AddressForm";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import type { FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

type PropsType = {
  currForm: number;
  formCTX: UseFormReturn<any>;
};

const LeftPageForm: FC<PropsType> = ({ currForm, formCTX }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-y-5">
      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>

      <FormProvider {...formCTX}>
        <AddressForm
          {...{
            swapID: "swapCheckoutForm",
            btnProfile: true,
            arrAddressSwap: fieldsSwapProfile,
          }}
        />
      </FormProvider>
    </div>
  );
};

export default LeftPageForm;
