import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { useFocus } from "@/core/hooks/hooks";
import { isArrOk, isObjOk } from "@/core/lib/lib";
import {
  CheckoutAddress,
  schemaCheckoutAddress,
} from "@/features/ConsumerLayout/CheckoutLayout/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import LeftPageForm from "./components/LeftPageForm";
import { useGroupItemsByStore } from "@/features/ConsumerLayout/CartLayout/hooks/useGroupItemsByStore";
import { useMixUserCartAsyncStates } from "@/features/ConsumerLayout/CartLayout/hooks/useMixUserCartAsyncStates";
import BriefSummary from "./components/BriefSummary/BriefSummary";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { handleErrFocusCheckout } from "@/core/lib/all/forms/errPostSubmit/checkout";
import s from "./CheckoutPage.module.css";
import { usePartialSwap } from "@/core/hooks/all/forms/useSwapForm/usePartialSwap";

const CheckoutPage: FC = () => {
  const { cart, isLoading, user, isError, error } = useMixUserCartAsyncStates();

  const ctx = useSwapCtxConsumer();
  const {
    state: { currSwapState, currForm },
  } = ctx;
  const { setCurrForm } = usePartialSwap({ ...ctx });

  const formCTX = useForm<CheckoutAddress>({
    resolver: zodResolver(schemaCheckoutAddress),
    mode: "onChange",
  });
  const {
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
    watch,
  } = formCTX;

  const handleSave = handleSubmit(
    async (data) => {
      console.log(data);
    },
    (errs) => {
      handleErrFocusCheckout(errs, setFocus, setCurrForm);

      return errs;
    }
  );

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
  const { isFormOk } = useListenFormOk({
    errors,
    watch,
  });

  useCLearTab();

  const { groupedByStoreID } = useGroupItemsByStore({ cart });

  return (
    <WrapPageAPI
      {...{
        isLoading,
        isError,
        error,
        isSuccess: isObjOk(user) && isArrOk(cart?.items),
      }}
    >
      <Title {...{ title: "checkout" }} />
      <div
        className={`${s.checkout_page} w-full grid grid-cols-1 justify-items-center gap-x-10 gap-y-10 xl:grid-cols-2`}
      >
        <BriefSummary {...{ groupedByStoreID }} />

        <LeftPageForm
          {...{ currForm, formCTX, handleSave, groupedByStoreID, isFormOk }}
        />
      </div>
    </WrapPageAPI>
  );
};

export default CheckoutPage;
