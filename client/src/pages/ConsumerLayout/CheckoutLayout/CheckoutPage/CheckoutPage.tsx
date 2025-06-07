import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Title from "@/components/elements/Title";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { useFocus } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import {
  CheckoutAddress,
  schemaCheckoutAddress,
} from "@/features/ConsumerLayout/CheckoutLayout/forms/schema";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

const CheckoutPage: FC = () => {
  const { user, isLoading } = useGetU();

  const formCTX = useForm<CheckoutAddress>({
    resolver: zodResolver(schemaCheckoutAddress),
    mode: "onChange",
  });
  const { setValue, setFocus } = formCTX;

  useEffect(() => {
    const keys = ["country", "state", "city", "street", "zipCode", "phone"];

    if (isObjOk(user)) {
      for (const k in user) {
        if (keys.includes(k))
          setValue(
            k as keyof CheckoutAddress,
            user[k as keyof CheckoutAddress] ?? "",
            {
              shouldValidate: true,
            }
          );
      }
    }
  }, [user, setValue]);

  const {
    state: { currSwapState, currForm },
  } = useSwapCtxConsumer();

  useFocus({
    key: "country",
    setFocus,
    delay: 500,
  });
  useFocusAddress({
    setFocus,
    currSwapState: currSwapState,
    currForm: currForm,
  });

  useCLearTab();

  return (
    <WrapPageAPI {...{ isLoading }}>
      <Title {...{ title: "checkout" }} />

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
    </WrapPageAPI>
  );
};

export default CheckoutPage;
