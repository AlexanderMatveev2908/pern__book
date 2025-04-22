/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  __cg,
  getData,
  isObjOk,
  schemaProfile,
  validateSwapper,
} from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../userSliceAPI";
import { Button, WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import { swapAddressByArea } from "@/config/fields/all/general/userFields";
import { keysHeaderProfile } from "@/config/fields/fields";

export type UserProfileForm = z.infer<typeof schemaProfile>;

const UserProfile: FC = () => {
  const [isFormOk, setIsFormOk] = useState(true);

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

  useEffect(() => {
    const updateForm = () => {
      const fields = getValues();
      if (isObjOk(user)) {
        for (const key in fields) {
          if (key === "Thumb" && user.Thumb?.url !== null)
            setValue(key as keyof UserProfileForm, user.Thumb?.url);
          else if (
            Object.keys(user ?? {}).some(
              (keyUser) => keyUser !== "Thumb" && keyUser === key
            )
          )
            setValue(
              key as keyof UserProfileForm,
              (user[key as keyof UserProfileForm] ?? "") as any
            );
        }
      }
    };
    updateForm();
  }, [user, getValues, setValue]);

  const { currForm, isNextDisabled, setNextDisabled } = useProfileCtx();

  useEffect(() => {
    const sub = watch((valsForm) => {
      const { isValid, i } = validateSwapper({
        objErr: errors,
        fieldsByArea: swapAddressByArea,
        valsForm,
      });
      const len = Object.keys(errors).length;

      // __cg("errors", len);
      // __cg("swapper", isValid, i, j);

      if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
      else if ((isValid || currForm < i) && isNextDisabled)
        setNextDisabled(false);

      if (len && isFormOk) setIsFormOk(false);
      else if (!len && !isFormOk) setIsFormOk(true);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [watch, currForm, errors, isNextDisabled, setNextDisabled, isFormOk]);

  const { setCurrForm } = useProfileCtx();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const vals = getValues();

    let isFormOk = true;

    for (const key of keysHeaderProfile) {
      if (errors?.[key as keyof UserProfileForm]?.message) {
        isFormOk = false;
        break;
      }
    }
    if (!isFormOk) {
      window.scroll({ top: 0, behavior: "smooth" });
      return;
    }

    // i is indispensable, j is made for learning purpose, is fundamental to pass an id as prop or set it based on path to scroll to the swapper called in page as component
    const { i, j, isValid } = validateSwapper({
      objErr: errors,
      valsForm: null,
      fieldsByArea: swapAddressByArea,
    });

    // __cg("swapper", isValid, i, j);

    if (i || j || !isValid) {
      setCurrForm(i);

      const swapEl = document.getElementById("userProfileSwap");
      const h = swapEl?.offsetHeight;

      window.scroll({ top: h, behavior: "smooth" });

      return;
    }

    __cg("vals", vals);
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
              }}
            />
          </div>
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
