import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn/FormFieldBtn";
import { fieldsProfileHeader } from "@/config/fields/fields";
import { UserType } from "@/types/types";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { UserProfileForm } from "../UserProfile";
import ThumbForm from "./ThumbForm";
// import my_thumb from "../../../../config/assetsDev/thumb/thumb.avif";

type PropsType = {
  user: UserType;
};

const HeaderUserProfile: FC<PropsType> = ({ user }) => {
  const formCtx = useFormContext<UserProfileForm>();
  const {
    register,
    formState: { errors },
    setFocus,
    setValue,
    watch,
    clearErrors,
  } = formCtx;

  return (
    <div className="w-full grid sm:grid-cols-[200px_1fr] md:flex md:justify-center  gap-10">
      <ThumbForm {...{ register, errors, user, watch }} />

      <div className="w-full sm:self-center justify-self-center grid items-start gap-5 sm:gap-8 h-fit sm:max-w-[500px]">
        {fieldsProfileHeader.map((el) => (
          <FormFieldBtn
            key={el.id}
            {...{
              register,
              errors,
              setFocus,
              setValue,
              user,
              el,
              clearErrors,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default HeaderUserProfile;
