import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import {
  useFocus,
  useWrapMutationAPI,
  useWrapQueryAPI,
} from "@/core/hooks/hooks";
import { isArrOk, isObjOk } from "@/core/lib/lib";
import {
  CheckoutAddressType,
  schemaCheckoutAddress,
} from "@/features/ConsumerLayout/CheckoutLayout/forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import LeftPageForm from "./components/LeftPageForm";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { handleErrFocusCheckout } from "@/core/lib/all/forms/errPostSubmit/checkout";
import s from "./CheckoutPage.module.css";
import { usePartialSwap } from "@/core/hooks/all/forms/useSwapForm/usePartialSwap";
import { checkoutSliceAPI } from "@/features/ConsumerLayout/CheckoutLayout/checkoutSliceAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useParams } from "react-router-dom";
import { REG_ID } from "@/core/config/regex";
import BriefSummary from "./components/BriefSummary/BriefSummary";

const CheckoutPage: FC = () => {
  const orderID = useParams()?.orderID;
  const isValidID = REG_ID.test(orderID ?? "");

  const { user } = useGetU();
  const res = checkoutSliceAPI.useGetClientSecretOrderQuery(
    { orderID: orderID! },
    {
      refetchOnMountOrArgChange: true,
      skip: !isValidID,
    }
  );
  useWrapQueryAPI({ ...res });

  const { data: { order } = {} } = res ?? [];

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
      await wrapMutationAPI({
        cbAPI: () => mutate({ data }),
      });

      if (!res) return;
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
    <WrapPageAPI
      {...{
        ...res,
        canStay: isValidID,
        isSuccess: isObjOk(user) && isArrOk(order?.orderStores),
      }}
    >
      <Title {...{ title: "checkout" }} />
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
          }}
        />
      </div>
    </WrapPageAPI>
  );
};

export default CheckoutPage;
