/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObjOk } from "@/core/lib/lib";
import { FormSettersProps, UserType } from "@/types/types";
import { useEffect } from "react";
import { UseFormGetValues } from "react-hook-form";
import { UserProfileForm } from "../components/ProfileSettingsPage/ProfileSettingsPageContent";

type Params = {
  getValues: UseFormGetValues<any>;
  user: UserType;
} & Omit<FormSettersProps, "watch">;

export const usePopulateProfile = ({ getValues, user, setValue }: Params) => {
  useEffect(() => {
    const updateForm = () => {
      const fields = getValues();
      if (isObjOk(user)) {
        for (const key in fields) {
          if (key === "thumb" && user.thumb?.url !== null)
            setValue(key as keyof UserProfileForm, user.thumb?.url);
          else if (
            Object.keys(user ?? {}).some(
              (keyUser) => keyUser !== "thumb" && keyUser === key
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
};
