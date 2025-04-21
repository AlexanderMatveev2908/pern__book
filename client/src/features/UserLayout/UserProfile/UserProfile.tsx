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
import { Button, WrapPageAPI } from "@/components/components";
import { UserType } from "@/types/types";
import HeaderUserProfile from "./components/HeaderUserProfile/HeaderUserProfile";
import BodyUserProfile from "./components/BodyUserProfile/BodyUserProfile";
import { useProfileCtx } from "@/app/pages/UserLayout/ProfileSettingsPage/ProfileCtx/ProfileCtx";
import { swapAddressByArea } from "@/config/fields/all/general/userFields";

const schema = z
  .object({
    ...schemaNames(),

    Thumb: z.union([z.string(), z.instanceof(FileList)]).optional(),

    ...schemaAddress(true),
  })
  .refine(
    (data) => {
      if (!data.Thumb?.length && data.Thumb instanceof FileList) return true;
      if (typeof data.Thumb === "string") return true;

      const updatedFile: File = (data.Thumb as FileList)[0];
      return updatedFile && updatedFile.type.startsWith("image");
    },
    {
      message: "Thumbnail must be a file of type image",
      path: ["Thumb"],
    }
  )
  .refine((data) => data.country.trim().length >= 2 || !data.country, {
    message: "If provided Country must have at least 2 chars",
    path: ["country"],
  })
  .refine((data) => data.state.trim().length >= 2 || !data.state, {
    message: "If provided State must have at least 2 chars",
    path: ["state"],
  })
  .refine((data) => data.city.trim().length >= 2 || !data.city, {
    message: "If provided City must have at least 2 chars",
    path: ["city"],
  })
  .refine((data) => data.street.trim().length >= 4 || !data.street, {
    message: "If provided street must have at least 4 chars",
    path: ["street"],
  })
  .refine((data) => data.zipCode.trim().length >= 4 || !data.zipCode, {
    message: "If provided Zip Code must be at least 4 chars",
    path: ["zipCode"],
  })
  .refine((data) => data.phone.trim().length >= 9 || !data.phone, {
    message: "If provided phone must be at least 9 chars",
    path: ["phone"],
  });

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

          <BodyUserProfile />

          <div className="w-[250px] justify-self-center mt-14">
            <Button
              {...{ type: "submit", label: "Save Changes", isDisabled: false }}
            />
          </div>
        </form>
      </FormProvider>
    </WrapPageAPI>
  );
};
export default UserProfile;
