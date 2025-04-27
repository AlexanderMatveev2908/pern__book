import { BreadCrumbForm, Title } from "@/components/components";
import AddressForm from "@/components/forms/AddressForm/AddressForm";
import { SwapFormPropsType } from "@/types/types";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  swapVals: SwapFormPropsType;
};

const BodyUserProfile: FC<PropsType> = ({ swapVals }) => {
  const formCtx = useFormContext();
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = formCtx;

  const { currForm } = swapVals;

  return (
    <div className="w-full grid mt-10 gap-8">
      <Title {...{ title: "my address", styleTxt: "txt__4" }} />

      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>
      <AddressForm
        {...{
          register,
          errors,
          clearErrors,
          setValue,
          swapID: "userProfileSwap",
          ...swapVals,
        }}
      />
    </div>
  );
};
export default BodyUserProfile;
