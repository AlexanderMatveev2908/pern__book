import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import AddressForm from "@/components/forms/AddressForm/AddressForm";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const BodyUserProfile: FC = () => {
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
          ...useProfileCtx(),
        }}
      />
    </div>
  );
};
export default BodyUserProfile;
