import FormFieldBtn from "@/components/forms/components/inputs/FormFieldBtn/FormFieldBtn";
import { UserType } from "@/types/types";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { UserProfileForm } from "../../UserProfile";
import ThumbForm from "./ThumbForm";
import { fieldsProfileHeader } from "@/config/fields/UserLayout/fieldsProfile";
// import my_thumb from "../../../../config/assetsDev/thumb/thumb.avif";

type PropsType = {
  user: UserType;
  eventCloseInput: boolean;
  setEventClose: (val: boolean) => void;
};

const HeaderUserProfile: FC<PropsType> = ({
  user,
  eventCloseInput,
  setEventClose,
}) => {
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
      <ThumbForm {...{ register, errors, watch, setValue }} />

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
              eventCloseInput,
              setEventClose,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default HeaderUserProfile;
