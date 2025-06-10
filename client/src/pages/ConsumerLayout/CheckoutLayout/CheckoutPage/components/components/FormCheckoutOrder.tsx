/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Button from "@/components/elements/buttons/Button/Button";
import FooterBar from "@/components/elements/FooterBar";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { priceFormatter } from "@/core/lib/lib";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { OrderType } from "@/types/all/orders";
import { BtnAct } from "@/types/types";
import { ReactNode, type FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { TbShoppingBagCheck } from "react-icons/tb";

type PropsType = {
  currForm: number;
  formCTX: UseFormReturn<any>;
  handleSave: () => void;
  isLoading: boolean;
  children: ReactNode;
  order: OrderType;
};

const FormCheckoutOrder: FC<PropsType> = ({
  currForm,
  formCTX,
  handleSave,
  isLoading,
  children,
  order,
}) => {
  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-y-16">
      <FormProvider {...formCTX}>
        <div className="w-full grid grid-cols-1 gap-y-5">
          <div className="w-full flex justify-center">
            <BreadCrumbForm {...{ currForm, totLen: 2 }} />
          </div>
          <AddressForm
            {...{
              swapID: "swapCheckoutForm",
              btnProfile: true,
              arrAddressSwap: fieldsSwapProfile,
            }}
          />
        </div>
        {children}

        <FooterBar {...{ translation: "translate-y-[70%]" }}>
          <WrapPairTxt
            {...{
              arg: ["Total", priceFormatter(+order.amount - +order.discount)],
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
                Icon: TbShoppingBagCheck,
                label: "Place order",
                styleTxt: "txt__3",
                isAging: isLoading,
                // isDisabled: !isFormOk,
              }}
            />
          </div>
        </FooterBar>
      </FormProvider>
    </form>
  );
};

export default FormCheckoutOrder;
