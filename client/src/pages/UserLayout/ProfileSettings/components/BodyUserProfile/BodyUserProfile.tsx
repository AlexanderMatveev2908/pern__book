import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Title from "@/components/elements/Title";
import BreadCrumbForm from "@/components/forms/BreadCrumbForm";
import {
  fieldsProfileAddress_0,
  fieldsProfileAddress_1,
} from "@/core/config/fieldsData/UserLayout/pofile";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { FC, useMemo } from "react";

const BodyUserProfile: FC = () => {
  const {
    state: { currForm },
  } = useSwapCtxConsumer();

  const arrAddressSwap = useMemo(
    () => [fieldsProfileAddress_0, fieldsProfileAddress_1],
    []
  );

  return (
    <div className="w-full grid mt-10 gap-8">
      <Title {...{ title: "my address", styleTxt: "txt__4" }} />

      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>
      <AddressForm
        {...{
          swapID: "userProfileSwap",
          arrAddressSwap,
        }}
      />
    </div>
  );
};
export default BodyUserProfile;
