/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProfileForm } from "@/features/UserLayout/UserProfile/UserProfile";
import { isObjOk } from "@/lib/lib";
import { UserType } from "@/types/types";
import { useEffect } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

type Params = {
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  user: UserType;
};

export const usePopulateForm = ({ getValues, user, setValue }: Params) => {
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
};
