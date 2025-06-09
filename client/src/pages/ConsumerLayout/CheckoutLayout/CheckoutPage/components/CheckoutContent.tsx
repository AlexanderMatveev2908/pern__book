import { useEffect, useState, type FC } from "react";
import BriefSummary from "./components/BriefSummary/BriefSummary";
import { checkoutSliceAPI } from "@/features/ConsumerLayout/CheckoutLayout/checkoutSliceAPI";
import { useFocus, useWrapMutationAPI } from "@/core/hooks/hooks";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { usePartialSwap } from "@/core/hooks/all/forms/useSwapForm/usePartialSwap";
import {
  CheckoutAddressType,
  schemaCheckoutAddress,
} from "@/features/ConsumerLayout/CheckoutLayout/forms/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleErrFocusCheckout } from "@/core/lib/all/forms/errPostSubmit/checkout";
import { isObjOk } from "@/core/lib/lib";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import LeftPageForm from "./components/LeftPageForm";
import { OrderType } from "@/types/all/orders";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import s from "./CheckoutContent.module.css";
import Title from "@/components/elements/Title";

type PropsType = {
  order: OrderType;
};

const CheckoutContent: FC<PropsType> = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPending, setIsPending] = useState(false);

  const { user } = useGetU();

  const [mutate, { isLoading }] =
    checkoutSliceAPI.useSendAddressOrderMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const ctx = useSwapCtxConsumer();
  const {
    state: { currSwapState, currForm },
  } = ctx;
  const { setCurrForm } = usePartialSwap({ ...ctx });

  const formCTX = useForm<CheckoutAddressType>({
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
      // const res = await wrapMutationAPI({
      //   cbAPI: () => mutate({ data }),
      // });
      // if (!res) return;

      if ([stripe, elements].some((el) => !isObjOk(el))) return;

      setIsPending(true);

      try {
        const { error, paymentIntent } =
          (await stripe?.confirmPayment({
            elements: elements!,
            redirect: "if_required",
          })) ?? {};

        if (error) {
          console.log(error);
          return;
        }

        console.log(paymentIntent);
      } catch (err) {
        console.log(err);
      } finally {
        setIsPending(false);
      }
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
            k as keyof CheckoutAddressType,
            user[k as keyof CheckoutAddressType] ?? "",
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

  return (
    <div
      className={`${s.checkout_page} w-full grid grid-cols-1 justify-items-center gap-x-10 gap-y-10 xl:grid-cols-2`}
    >
      <BriefSummary {...{ order: order! }} />

      <LeftPageForm
        {...{
          currForm,
          formCTX,
          handleSave,
          isFormOk,
          isLoading,
          order,
        }}
      >
        <div className="w-full grid gap-y-6 justify-items-center">
          <Title {...{ title: "Card details", styleTxt: "txt__4" }} />

          <div className="w-full max-w-[500px] sm:max-w-[600px] border-2 border-blue-600 rounded-xl ">
            <PaymentElement />
          </div>
        </div>
      </LeftPageForm>
    </div>
  );
};

export default CheckoutContent;
