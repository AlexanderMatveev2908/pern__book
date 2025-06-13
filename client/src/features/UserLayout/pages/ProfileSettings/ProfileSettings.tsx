import { useCallback, useState, type FC } from "react";
import { z } from "zod";
import { schemaProfile } from "../../forms/schema";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useUpdateProfileMutation } from "../../userSliceAPI";
import { allProfileKeys, fieldsSwapProfile } from "../../fields/profile";
import {
  isObjOk,
  isSameData,
  makeDelay,
  makeObj,
  preSubmitCheckProfile,
} from "@/core/lib/lib";
import {
  useFocus,
  usePopulateProfile,
  useWrapMutationAPI,
} from "@/core/hooks/hooks";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import { useListenFormOk } from "@/core/hooks/all/forms/useListenFormOk";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import { makeFormDataProfile } from "../../forms/formatVals";
import { openToast } from "@/features/common/Toast/toastSlice";
import { EventApp, UserType } from "@/types/types";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import Title from "@/components/elements/Title";
import Button from "@/components/elements/buttons/Button/Button";
import { useFormSwap } from "@/core/hooks/all/forms/useSwapForm/useSwapForm";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";

export type UserProfileForm = z.infer<typeof schemaProfile>;

const ProfileSettings: FC = () => {
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
  const { user, isLoading, error, isError } = useGetU() ?? {};

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
  usePopulateProfile({
    user,
    getValues,
    setValue,
  });
  const { setCurrForm, currSwapState, currForm } = useFormSwap({
    ...useSwapCtxConsumer(),
    watch,
    errors,
    fields: fieldsSwapProfile,
  });

  const { isFormOk } = useListenFormOk({
    errors,
    customValidateCB: handleCheckEqData,
    watch,
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
    <WrapPageAPI {...{ isLoading, isError, error, isSuccess: isObjOk(user) }}>
      <Title {...{ title: "my profile" }} />
      <FormProvider {...formCtx}>
        <form onSubmit={handleSave} className="w-full grid">
          <HeaderUserProfile
            {...{ user, eventCloseInput: eventClose, setEventClose }}
          />

          <BodyUserProfile />

          <div className="w-full max-w-[250px] justify-self-center mt-14">
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
  );
};

export default ProfileSettings;
