/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Button from "@/components/elements/buttons/Button/Button";
import FooterBar from "@/components/elements/FooterBar";
import Title from "@/components/elements/Title";
import WrapPairTxt from "@/components/elements/WrapPairTxt/WrapPairTxt";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { priceFormatter } from "@/core/lib/lib";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { OrderType } from "@/types/all/orders";
import { BtnAct } from "@/types/types";
import { PaymentElement } from "@stripe/react-stripe-js";
import { type FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { TbShoppingBagCheck } from "react-icons/tb";
import DummyCards from "./DummyCards/DummyCards";
import BriefSummary from "./BriefSummary/BriefSummary";

type PropsType = {
  currForm: number;
  formCTX: UseFormReturn<any>;
  handleSave: () => void;
  isLoading: boolean;
  order: OrderType;
};

const FormCheckoutOrder: FC<PropsType> = ({
  currForm,
  formCTX,
  handleSave,
  isLoading,
  order,
}) => {
  return (
    <form onSubmit={handleSave} className="w-full grid grid-cols-1 gap-y-20">
      <FormProvider {...formCTX}>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-y-10 gap-x-10">
          <BriefSummary {...{ order }} />
          <div
            className="w-full h-fit grid-cols-1 grid gap-y-5
          "
          >
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
        </div>
        <div className="w-full grid justify-items-center gap-x-10 xl:grid-cols-2 gap-y-10">
          <div className="form__size w-full grid grid-cols-1 gap-y-5 h-fit">
            <Title {...{ title: "Card details", styleTxt: "txt__4" }} />

            <div className="w-full max-w-[500px] sm:max-w-[600px] border-2 border-blue-600 rounded-xl ">
              <PaymentElement />
            </div>
          </div>

          <DummyCards />
        </div>

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
