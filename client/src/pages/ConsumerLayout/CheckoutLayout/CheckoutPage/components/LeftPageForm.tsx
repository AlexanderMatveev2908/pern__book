/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Button from "@/components/elements/buttons/Button/Button";
import FooterBar from "@/components/elements/FooterBar";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { BtnAct } from "@/types/types";
import { type FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

type PropsType = {
  currForm: number;
  formCTX: UseFormReturn<any>;
  handleSave: () => void;
};

const LeftPageForm: FC<PropsType> = ({ currForm, formCTX, handleSave }) => {
  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-y-5">
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

        <FooterBar {...{ translation: "translate-y-[60%]" }}>
          <div className="w-full justify-self-center max-w-[300px] mt-5">
            <Button
              {...{
                type: "submit",
                act: BtnAct.DO,
                label: "Save & Continue",
                styleTxt: "txt__3",
              }}
            />
          </div>
        </FooterBar>
      </FormProvider>
    </form>
  );
};

export default LeftPageForm;
