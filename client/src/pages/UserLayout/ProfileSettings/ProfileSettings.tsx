import {
  useFocus,
  usePopulateForm,
  useScroll,
  useWrapMutationAPI,
} from "@/core/hooks/hooks";
import {
  getData,
  isSameData,
  makeDelay,
  makeFormDataProfile,
  makeObj,
  preSubmitCheckProfile,
  schemaProfile,
} from "@/core/lib/lib";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { EventApp, UserType } from "@/types/types";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/features/UserLayout/userSliceAPI";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { openToast } from "@/features/common/Toast/toastSlice";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import {
  allProfileKeys,
  swapAddressByArea,
} from "@/core/config/fieldsData/UserLayout/pofile";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import Button from "@/components/elements/buttons/Button/Button";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";

export type UserProfileForm = z.infer<typeof schemaProfile>;

const ProfileSettings = () => {
  useScroll();

  const [eventClose, setEventClose] = useState(false);

  const dispatch = useDispatch();

  const formCtx = useForm<UserProfileForm>({
    resolver: zodResolver(schemaProfile),
    mode: "onChange",
  });
  const {
    getValues,
    setValue,
    watch,
    setFocus,
    formState: { errors },
  } = formCtx;

  useCLearTab();
  const { data, isLoading, error, isError } = useGetUserProfileQuery() ?? {};
  const user: UserType = getData(data, "user");
  const [updateProfile, { isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation();

  const vals = watch();

  const handleCheckEqData = useCallback(() => {
    const original = makeObj(user, allProfileKeys, (key) =>
      key === "thumb" ? user?.thumb?.url : user?.[key as keyof UserType] || null
    );

    const updated = makeObj(vals, allProfileKeys, (key) =>
      key === "thumb" && vals[key] instanceof FileList
        ? vals?.thumb?.[0] || null
        : vals[key as keyof UserProfileForm] || null
    );

    const canMakeAPI = !isSameData(original, updated);

    return canMakeAPI;
  }, [vals, user]);

  const { wrapMutationAPI } = useWrapMutationAPI();
  usePopulateForm({
    user,
    getValues,
    setValue,
  });
  const { setCurrForm, currSwapState, currForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: swapAddressByArea,
  });

  const { isFormOk } = useListenFormOk({
    errors,
    customValidateCB: handleCheckEqData,
  });

  useFocusAddress({
    setFocus,
    currSwapState,
    currForm,
  });

  useFocus({ key: "country", setFocus, delay: 750 });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setEventClose(true);

    const isFormOk = preSubmitCheckProfile({ errors, setCurrForm });
    if (!isFormOk) return;

    const vals = getValues();
    const formData = makeFormDataProfile(vals);

    const original = makeObj(user, allProfileKeys, (key) =>
      key === "thumb" ? user?.thumb?.url : user?.[key as keyof UserType] || null
    );
    const updated = makeObj(vals, allProfileKeys, (key) =>
      key === "thumb" && vals[key] instanceof FileList
        ? vals?.thumb?.[0]
        : vals[key as keyof UserProfileForm] || null
    );

    const makeAPI = !isSameData(original, updated);

    if (!makeAPI) {
      dispatch(
        openToast({
          type: EventApp.OK,
          msg: "Fake update user profile 🎉",
          statusCode: 200,
        })
      );
      return;
    }

    const res = await wrapMutationAPI({
      cbAPI: () => updateProfile(formData),
    });
    if (!res) return;

    setCurrForm(0, null);

    makeDelay(() => window.scroll({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    // <ProfileCtxProvider>
    <div className="parent__page ">
      <Title {...{ title: "my profile" }} />
      <WrapPageAPI {...{ isLoading, isError, error }}>
        <FormProvider {...formCtx}>
          <form onSubmit={handleSave} className="w-full grid">
            <HeaderUserProfile
              {...{ user, eventCloseInput: eventClose, setEventClose }}
            />

            <BodyUserProfile />

            <div className="w-[250px] justify-self-center mt-14">
              <Button
                {...{
                  type: "submit",
                  label: "Save Changes",
                  isDisabled: !isFormOk,
                  isAging: isLoadingUpdate,
                }}
              />
            </div>
          </form>
        </FormProvider>
      </WrapPageAPI>
    </div>
    // </ProfileCtxProvider>
  );
};
export default ProfileSettings;
