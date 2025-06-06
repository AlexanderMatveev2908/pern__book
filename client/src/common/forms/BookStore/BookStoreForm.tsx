import WrapperFormField from "@/components/HOC/WrapperFormField";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import ContactForm from "./components/ContactForm";
import AddressForm from "../AddressForm/AddressForm";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import DeliveryForm from "./components/DeliveryForm";
import TeamForm from "./components/TeamForm";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import TxtField from "@/components/forms/inputs/TxtField";
import VideoField from "@/components/forms/inputs/VideoField";
import ImagesField from "@/components/forms/inputs/ImagesField/ImagesField";
import { CatBookStore } from "@/types/all/bookStore";
import Button from "@/components/elements/buttons/Button/Button";
import { useLocation } from "react-router-dom";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";
import CheckBoxSwapper from "@/components/forms/layouts/CheckBoxSwapper/CheckBoxSwapper";
import OptionalField from "@/components/elements/OptionalField";
import {
  fieldDescStore,
  fieldNameStore,
  fieldsSwapStore,
} from "@/core/config/fieldsData/bookStores/forms";
import { UserRole } from "@/types/types";

type PropsType = {
  handleSave: (e: React.FormEvent) => void;
  isFormOk: boolean;
  isLoading: boolean;
  role: UserRole;
};

const BookStoreForm: FC<PropsType> = ({
  handleSave,
  isFormOk,
  isLoading,
  role,
}) => {
  const ctx = useFormContext();
  const path = useLocation().pathname;
  const {
    control,
    formState: { errors },
    setFocus,
    setValue,
    register,
  } = ctx;

  const {
    state: { currSwapState, currForm },
  } = useSwapCtxConsumer();
  useFocusAddress({
    setFocus,
    currSwapState: currSwapState,
    currForm: currForm,
  });
  useCLearTab();

  const swapID = useMemo(() => {
    const splitted = path.split("/");

    return `swapFormStore${
      splitted.some((el) => el === "create") ? "Create" : "Update"
    }`;
  }, [path]);

  const level = useMemo(() => {
    const roles = [UserRole.MANAGER, UserRole.OWNER];
    const userI = roles.findIndex((el) => el === role);

    return userI;
  }, [role]);

  return (
    <form onSubmit={handleSave} className="p_form__0 book_store_form">
      <OptionalField />

      <WrapperFormField
        {...{
          title: "bookstore name *",
          sizeStyle: "max-w-[500px] lg:max-w-1/2",
          isDisabled: !level,
          styleTxt: level ? "text-green-600" : "",
        }}
      >
        <FormField
          {...{
            control,
            errors,
            el: fieldNameStore,
            showLabel: false,
            isDisabled: !level,
          }}
        />
      </WrapperFormField>

      <WrapperFormField
        {...{ title: "Description", sizeStyle: "max-w-[500px] lg:max-w-1/2" }}
      >
        <TxtField
          {...{ register, errors, el: fieldDescStore, showLabel: false }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Video" }}>
        <VideoField {...{ register, errors, setValue }} />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Images" }}>
        <ImagesField />
      </WrapperFormField>

      <WrapperFormField
        {...{
          title: "Categories (max-3) *",
          styleTxt: level ? "text-green-600" : "",
          isDisabled: !level,
        }}
      >
        <CheckBoxSwapper
          {...{
            keyForm: "categories",
            maxData: 3,
            fieldsArg: Object.values(CatBookStore),
            isDisabled: !level,
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Contact", isDisabled: !level }}>
        <ContactForm {...{ isDisabled: !level }} />
      </WrapperFormField>

      <WrapperFormField
        {...{
          title: "Address *",
          styleTxt: level ? "text-green-600" : "",
          isDisabled: !level,
        }}
      >
        <AddressForm
          {...{
            swapID,
            btnProfile: true,
            arrAddressSwap: fieldsSwapStore,
            isDisabled: !level,
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Delivery" }}>
        <DeliveryForm />
      </WrapperFormField>

      {!!level && (
        <WrapperFormField {...{ title: "Team" }}>
          <TeamForm />
        </WrapperFormField>
      )}

      <div className="w-full max-w-[300px] mt-8">
        <Button
          {...{
            type: "submit",
            label: `${path.includes("create") ? "Create" : "Update"} Bookstore`,
            isDisabled: !isFormOk,
            isAging: isLoading,
          }}
        />
      </div>
    </form>
  );
};

export default BookStoreForm;
