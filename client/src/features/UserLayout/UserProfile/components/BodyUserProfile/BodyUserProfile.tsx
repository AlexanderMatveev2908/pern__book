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

  return (
    <div className="w-full grid mt-10">
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
