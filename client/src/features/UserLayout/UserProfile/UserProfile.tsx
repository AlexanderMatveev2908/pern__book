/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  __cg,
  getData,
  isObjOk,
  schemaAddress,
  schemaNames,
  validateSwapper,
} from "@/lib/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetUserProfileQuery } from "../userSliceAPI";
import { WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import { swapAddressByArea } from "@/config/fields/all/general/userFields";

const schema = z
  .object({
    ...schemaNames(),

    Thumb: z.union([z.string(), z.instanceof(FileList)]),

    ...schemaAddress(),
  })
  .refine(
    (data) =>
      !data?.Thumb?.[0] || (data?.Thumb?.[0] as File)?.type.startsWith("image"),
    {
      message: "Thumbnail must be an image",
      path: ["Thumb"],
    }
  );

export type UserProfileForm = z.infer<typeof schema>;

const UserProfile: FC = () => {
  const formCtx = useForm<UserProfileForm>({
    resolver: zodResolver(schema),
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
            setValue(key as keyof UserProfileForm, user.Thumb!.url);
          else if (Object.keys(user ?? {}).some((keyUser) => keyUser === key))
            setValue(
              key as keyof UserProfileForm,
              (user[key as keyof UserProfileForm] ?? "") as any
            );
        }
      }
    };
    updateForm();
  }, [user, getValues, setValue]);

  const handleSave = formCtx.handleSubmit(async (data) => {
    console.log(data);
  });

  const { currForm, isNextDisabled, setNextDisabled } = useProfileCtx();

  useEffect(() => {
    const sub = watch((valsForm) => {
      const { isValid, i, j } = validateSwapper({
        objErr: errors,
        fieldsByArea: swapAddressByArea,
        valsForm,
      });

      __cg("swapper", isValid, i, j);

      if (!isValid && i <= currForm && !isNextDisabled) setNextDisabled(true);
      else if ((isValid || currForm < i) && isNextDisabled)
        setNextDisabled(false);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [watch, currForm, errors, isNextDisabled, setNextDisabled]);

  return (
    <WrapPageAPI {...{ isLoading, isError, error }}>
      <FormProvider {...formCtx}>
        <form onSubmit={handleSave} className="w-full grid">
          <HeaderUserProfile {...{ user }} />
          <BodyUserProfile {...{ user }} />
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
