import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import AddressForm from "@/components/forms/AddressForm/AddressForm";
import { UserType } from "@/types/types";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  user: UserType;
};

const BodyUserProfile: FC<PropsType> = ({ user }) => {
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
          user,
          ...useProfileCtx(),
        }}
      />
    </div>
  );
};
export default BodyUserProfile;
