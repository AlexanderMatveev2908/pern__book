import WrapperFormField from "@/components/HOC/WrapperFormField";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import ContactForm from "./components/ContactForm";
import AddressForm from "../AddressForm/AddressForm";
import { useCLearTab } from "@/core/hooks/all/UI/useClearTab";
import { useFocusAddress } from "@/core/hooks/all/UI/useFocusAddress";
import DeliveryForm from "./components/DeliveryForm";
import TeamForm from "./components/TeamForm/TeamForm";
import "./BookStoreForm.css";
import {
  fieldDescStore,
  fieldNameStore,
  fieldsSwapStore,
} from "@/core/config/fieldsData/OwnerLayout/post";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import TxtField from "@/components/forms/inputs/TxtField";
import VideoField from "@/components/forms/inputs/VideoField";
import ImagesField from "@/components/forms/inputs/ImagesField/ImagesField";
import CheckBoxSwapper from "@/components/forms/CheckBoxSwapper/CheckBoxSwapper";
import { CatBookStore } from "@/types/all/bookStore";
import Button from "@/components/elements/buttons/Button/Button";
import { useLocation } from "react-router-dom";
import { capt } from "@/core/lib/lib";
import { useSwapCtxConsumer } from "@/core/contexts/SwapCtx/ctx/ctx";

type PropsType = {
  handleSave: (e: React.FormEvent) => void;
};

const BookStoreForm: FC<PropsType> = ({ handleSave }) => {
  const ctx = useFormContext();
  const path = useLocation().pathname;
  const {
    register,
    formState: { errors },
    setFocus,
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

  const swapID = useMemo(
    () => "swapFormStore" + capt(path.split("/").pop() ?? ""),
    [path]
  );

  return (
    <form onSubmit={handleSave} className="__cont gap-8">
      <div className="w-full flex justify-end">
        <span className="txt__1 border-b-[3px] border-blue-600 pb-1">
          Fields with ~ near name are optional
        </span>
      </div>

      <WrapperFormField
        {...{
          title: "bookstore name",
          sizeStyle: "max-w-[500px] lg:max-w-1/2",
        }}
      >
        <FormField
          {...{ register, errors, el: fieldNameStore, showLabel: false }}
        />
      </WrapperFormField>

      <WrapperFormField
        {...{ title: "Description ~", sizeStyle: "max-w-[500px] lg:max-w-1/2" }}
      >
        <TxtField
          {...{ register, errors, el: fieldDescStore, showLabel: false }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Video ~" }}>
        <VideoField />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Images ~" }}>
        <ImagesField />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Categories (max-3)" }}>
        <CheckBoxSwapper
          {...{
            keyForm: "categories",
            maxData: 3,
            fieldsArg: Object.values(CatBookStore),
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Contact" }}>
        <ContactForm />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Address" }}>
        <AddressForm
          {...{
            swapID,
            btnProfile: true,
            arrAddressSwap: fieldsSwapStore,
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Delivery" }}>
        <DeliveryForm />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Team ~" }}>
        <TeamForm />
      </WrapperFormField>

      <div className="w-[300px]">
        <Button
          {...{ type: "submit", label: "Create Bookstore", isDisabled: false }}
        />
      </div>
    </form>
  );
};

export default BookStoreForm;
