/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Button from "@/components/elements/buttons/Button/Button";
import FooterBar from "@/components/elements/FooterBar";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { priceFormatter } from "@/core/lib/lib";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { CartType } from "@/types/all/Cart";
import { BtnAct } from "@/types/types";
import { type FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

type PropsType = {
  currForm: number;
  formCTX: UseFormReturn<any>;
  handleSave: () => void;
  cart: CartType;
};

const LeftPageForm: FC<PropsType> = ({
  currForm,
  formCTX,
  handleSave,
  cart,
}) => {
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

        <FooterBar {...{ translation: "translate-y-[70%]" }}>
          <WrapPairTxt
            {...{
              arg: ["Total", priceFormatter(cart!.totPrice)],
              customStyles: [
                "justify-self-center txt__4",
                "justify-self-center txt__4",
              ],
            }}
          />

          <div className="w-full justify-self-center max-w-[300px] mt-5">
            <Button
              {...{
                type: "submit",
                act: BtnAct.DO,
                label: "Save & Continue",
                styleTxt: "txt__3",
                // isDisabled: !isFormOk,
              }}
            />
          </div>
        </FooterBar>
      </FormProvider>
    </form>
  );
};

export default LeftPageForm;
