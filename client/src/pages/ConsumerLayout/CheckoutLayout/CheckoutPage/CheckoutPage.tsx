import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isArrOk, isObjOk, isStr } from "@/core/lib/lib";
import { type FC } from "react";
import { checkoutSliceAPI } from "@/features/ConsumerLayout/CheckoutLayout/checkoutSliceAPI";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useParams } from "react-router-dom";
import { REG_ID } from "@/core/config/regex";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutContent from "./components/CheckoutContent";
import { stripePromise } from "@/core/config/stripe";

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

  const { data: { order, clientSecret } = {} } = res ?? [];

  console.log(stripePromise);

  return (
    <WrapPageAPI
      {...{
        ...res,
        canStay: isValidID,
        isSuccess: isObjOk(user) && isArrOk(order?.orderStores),
      }}
    >
      <Title {...{ title: "checkout" }} />

      {stripePromise && isStr(clientSecret) && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            fonts: [
              {
                cssSrc:
                  "https://fonts.googleapis.com/css2?family=Sour+Gummy&display=swap",
              },
            ],
            appearance: {
              theme: "night",
              variables: {
                colorBackground: "#000",
                colorText: "whitesmoke",
                fontFamily: "Sour Gummy",
                colorPrimary: "#1e40af",
                borderRadius: "10px",
                colorDanger: "#dc2626",
                colorSuccess: "#16a34a",
              },
              rules: {
                ".Label": {
                  fontSize: "20px",
                },
                ".Input": {
                  fontSize: "18px",
                },
                ".Input::placeholder": {
                  color: "#9ca3af",
                },
                ".Input:focus": {
                  borderColor: "#1e40af",
                },
              },
            },
          }}
        >
          <CheckoutContent {...{ order: order! }} />
        </Elements>
      )}
    </WrapPageAPI>
  );
};

export default CheckoutPage;
