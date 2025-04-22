import {
  getData,
  makeFormDataProfile,
  preSubmitCheckProfile,
  schemaProfile,
} from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../userSliceAPI";
import { Button, WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import { usePopulateForm, useWrapMutationAPI } from "@/hooks/hooks";
import { useValidateSwapAddress } from "@/contexts/SwapAddress/useValidateSwapAddress";

export type UserProfileForm = z.infer<typeof schemaProfile>;

const UserProfile: FC = () => {
  const formCtx = useForm<UserProfileForm>({
    resolver: zodResolver(schemaProfile),
    mode: "onChange",
  });
  const {
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = formCtx;

  const { data, isLoading, error, isError } = useGetUserProfileQuery() ?? {};
  const user: UserType = getData(data, "user");
  const [updateProfile, { isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation();

  const { wrapMutationAPI } = useWrapMutationAPI();
  const { setCurrForm, ...valsSwap } = useProfileCtx();
  usePopulateForm({
    user,
    getValues,
    setValue,
  });
  const { isFormOk } = useValidateSwapAddress({
    watch,
    errors,
    ...valsSwap,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFormOk = preSubmitCheckProfile({ errors, setCurrForm });
    if (!isFormOk) return;

    const vals = getValues();
    const formData = makeFormDataProfile(vals);

    const res = await wrapMutationAPI({
      cbAPI: () => updateProfile(formData),
    });
    if (!res) return;
  };

  return (
    <WrapPageAPI {...{ isLoading, isError, error }}>
      <FormProvider {...formCtx}>
        <form onSubmit={handleSave} className="w-full grid">
          <HeaderUserProfile {...{ user }} />

          <BodyUserProfile />

          <div className="w-[250px] justify-self-center mt-14">
            <Button
              {...{
                type: "submit",
                label: "Save Changes",
                // isDisabled: false,
                isDisabled: !isFormOk,
                isAging: isLoadingUpdate,
              }}
            />
          </div>
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
