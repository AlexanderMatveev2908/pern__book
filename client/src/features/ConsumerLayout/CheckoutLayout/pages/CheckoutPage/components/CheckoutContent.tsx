/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FC } from "react";
import { checkoutSliceAPI } from "@/features/ConsumerLayout/CheckoutLayout/checkoutSliceAPI";
import {
  useFocus,
  useWrapMutationAPI,
  useWrapQueryAPI,
} from "@/core/hooks/hooks";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { usePartialSwap } from "@/core/hooks/all/forms/useSwapForm/usePartialSwap";
import {
  CheckoutAddressType,
  schemaCheckoutAddress,
} from "@/features/ConsumerLayout/CheckoutLayout/forms/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleErrFocusCheckout } from "@/core/lib/all/forms/errPostSubmit/checkout";
import { __cg, isObjOk } from "@/core/lib/lib";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import FormCheckoutOrder from "./components/FormCheckoutOrder";
import { OrderType } from "@/types/all/orders";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import s from "./CheckoutContent.module.css";
import { useDispatch } from "react-redux";
import { openToast } from "@/features/common/Toast/toastSlice";
import { EventApp } from "@/types/types";

type PropsType = {
  order: OrderType;
  refetchOrder: () => void;
};

const CheckoutContent: FC<PropsType> = ({ order, refetchOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPending, setIsPending] = useState(false);

  const { user } = useGetU();

  const dispatch = useDispatch();

  const [mutate] = checkoutSliceAPI.useSendAddressOrderMutation();
  const { wrapMutationAPI } = useWrapMutationAPI();

  const [triggerRTK, res] = checkoutSliceAPI.useLazyPollOrderQuery();

  useWrapQueryAPI({
    ...res,
    hideErr: true,
  });

  const handlePoll = async () => {
    const MAX_COUNT = 10;
    let count = 0;

    let freshOrder: OrderType | null = null;

    while (!isObjOk(freshOrder) && count < MAX_COUNT) {
      try {
        ({ order: freshOrder } =
          (await triggerRTK({
            orderID: order.id,
          }).unwrap()) ?? {});

        if (isObjOk(freshOrder)) break;
      } catch (err: any) {
        __cg(`err poll ${count}`, err);

        count++;

        if (count >= MAX_COUNT) return null;

        await new Promise((res) => setTimeout(res, 2000));
      }
    }

    return freshOrder;
  };

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
      setIsPending(true);

      const res = await wrapMutationAPI({
        cbAPI: () => mutate({ data, orderID: order.id }),
        showToast: false,
      });
      if (!res) {
        refetchOrder();
        setIsPending(false);
        return;
      }

      if ([stripe, elements].some((el) => !isObjOk(el))) {
        dispatch(
          openToast({
            msg: "stripe not initialized",
            type: EventApp.ERR,
            statusCode: 500,
          })
        );
        setIsPending(false);
        return;
      }

      try {
        const { error, paymentIntent } =
          (await stripe?.confirmPayment({
            elements: elements!,
            redirect: "if_required",
          })) ?? {};

        if (error) {
          dispatch(
            openToast({
              msg: error?.message ?? "payment failed",
              type: EventApp.ERR,
              statusCode: 500,
            } as any)
          );
          __cg("payment fail on service provider", error);
          return;
        }

        __cg("payment on client is cool", paymentIntent);

        const freshOrder = await handlePoll();

        if (!isObjOk(freshOrder)) {
          refetchOrder();
          dispatch(
            openToast({
              msg: "A wild Slime ambushed the party! The server took critical damage. Try again after a short rest. 👻",
              type: EventApp.ERR,
              statusCode: 500,
            } as any)
          );
          return;
        }

        dispatch(
          openToast({
            msg: "payment successful",
            type: EventApp.OK,
            statusCode: 200,
          })
        );
      } catch (err) {
        __cg("deep dummy error", err);
        dispatch(
          openToast({
            msg: "my fault buddy 👻",
            type: EventApp.ERR,
            statusCode: 500,
          } as any)
        );
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
      className={`${s.checkout_page} w-full grid grid-cols-1 justify-items-center gap-x-10 gap-y-10`}
    >
      <FormCheckoutOrder
        {...{
          currForm,
          formCTX,
          handleSave,
          isFormOk,
          isLoading: isPending,
          order,
        }}
      />
    </div>
  );
};

export default CheckoutContent;
