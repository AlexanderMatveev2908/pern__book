import { FieldErrors } from "react-hook-form";
import { validateSwapper } from "../../../core/lib/all/forms/validators/general";
import {
  fieldsSwapProfile,
  keysHeaderProfile,
} from "@/features/UserLayout/fields/profile";
import { UserProfileForm } from "../components/ProfileSettingsPage/ProfileSettingsPageContent";

type Params = {
  errors: FieldErrors;
  setCurrForm: (val: number) => void;
};

export const preSubmitCheckProfile = ({
  errors,
  setCurrForm,
}: Params): boolean => {
  let isFormOk = true;

  for (const key of keysHeaderProfile) {
    if (errors?.[key as keyof UserProfileForm]?.message) {
      isFormOk = false;
      break;
    }
  }

  if (!isFormOk) {
    window.scroll({ top: 0, behavior: "smooth" });
    return isFormOk;
  }

  // i is indispensable, j is made for learning purpose, is fundamental to pass an id as prop or set it based on path to scroll to the swapper called in page as component
  const { i, j, isValid } = validateSwapper({
    objErr: errors,
    valsForm: null,
    fieldsByArea: fieldsSwapProfile,
  });

  if (i || j || !isValid) {
    isFormOk = false;
    setCurrForm(i);

    const swapEl = document.getElementById("userProfileSwap");
    const h = swapEl?.offsetHeight;

    window.scroll({ top: h, behavior: "smooth" });

    return isFormOk;
  }

  return isFormOk;
};
