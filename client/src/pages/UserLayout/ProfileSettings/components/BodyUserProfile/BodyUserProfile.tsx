import AddressForm from "@/common/forms/AddressForm/AddressForm";
import Title from "@/components/elements/Title";
import BreadCrumbForm from "@/components/forms/layouts/BreadCrumbForm";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { fieldsSwapProfile } from "@/features/UserLayout/fields/profile";
import { FC } from "react";

const BodyUserProfile: FC = () => {
  const {
    state: { currForm },
  } = useSwapCtxConsumer();

  return (
    <div className="w-full grid mt-10 gap-8">
      <Title {...{ title: "my address", styleTxt: "txt__4" }} />

      <div className="w-full flex justify-center">
        <BreadCrumbForm {...{ currForm, totLen: 2 }} />
      </div>
      <AddressForm
        {...{
          swapID: "userProfileSwap",
          arrAddressSwap: fieldsSwapProfile,
        }}
      />
    </div>
  );
};
export default BodyUserProfile;
