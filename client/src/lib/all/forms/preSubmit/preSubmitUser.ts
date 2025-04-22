import { UserProfileForm } from "@/features/UserLayout/UserProfile/UserProfile";
import { FieldErrors } from "react-hook-form";
import { validateSwapper } from "../validators";
import { swapAddressByArea } from "@/config/fields/general/userFields";
import { keysHeaderProfile } from "@/config/fields/UserLayout/fieldsProfile";

type Params = {
  errors: FieldErrors;
  setCurrForm: (val: number) => void;
};

export const preSubmitCheckProfile = ({ errors, setCurrForm }: Params) => {
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
    fieldsByArea: swapAddressByArea,
  });

  // __cg("swapper", isValid, i, j);

  if (i || j || !isValid) {
    setCurrForm(i);

    const swapEl = document.getElementById("userProfileSwap");
    const h = swapEl?.offsetHeight;

    window.scroll({ top: h, behavior: "smooth" });

    return isFormOk;
  }

  return isFormOk;
};
