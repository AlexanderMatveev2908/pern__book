import { FormField } from "@/components/components";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import {
  fieldDescStore,
  fieldNameStore,
  fieldsSwapAddressStore,
} from "@/config/fields/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import TxtField from "../components/inputs/TxtField";
import VideoField from "../components/inputs/VideoField";
import ImagesField from "../components/inputs/ImagesField/ImagesField";
import CheckBoxSwapper from "../components/CheckBoxSwapper/CheckBoxSwapper";
import { CatBookStore } from "@/types/all/bookStore";
import ContactForm from "./components/ContactForm";
import AddressForm from "../AddressForm/AddressForm";
import { useFormSwap } from "@/hooks/all/forms/useSwapAddress/useSwapForm";

type PropsType = {
  handleSave: () => void;
};

const BookStoreForm: FC<PropsType> = ({ handleSave }) => {
  const ctx = useFormContext();
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = ctx;

  const { currForm, setCurrForm, isNextDisabled, setNextDisabled } =
    useFormSwap({
      watch,
      errors,
      fields: fieldsSwapAddressStore,
    });

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
        <VideoField {...{ setValue, register, errors, watch }} />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Images ~" }}>
        <ImagesField {...{ setValue, register, errors, watch }} />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Categories (max-3)" }}>
        <CheckBoxSwapper
          {...{
            setValue,
            errors,
            keyForm: "categories",
            watch,
            maxData: 3,
            fieldsArg: Object.values(CatBookStore),
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Contact" }}>
        <ContactForm
          {...{
            register,
            errors,
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Address" }}>
        <AddressForm
          {...{
            register,
            errors,
            currForm,
            setCurrForm,
            isNextDisabled,
            setNextDisabled,
            setValue,
            clearErrors,
            swapID: "swapFormStore",
            btnProfile: true,
          }}
        />
      </WrapperFormField>
    </form>
  );
};

export default BookStoreForm;
