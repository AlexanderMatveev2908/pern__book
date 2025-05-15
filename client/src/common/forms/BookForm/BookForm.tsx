import Button from "@/components/elements/buttons/Button/Button";
import OptionalField from "@/components/elements/OptionalField";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import ImagesField from "@/components/forms/inputs/ImagesField/ImagesField";
import TxtField from "@/components/forms/inputs/TxtField";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import {
  fieldAuthY,
  fieldDescBook,
  fieldsPriceQty,
  titleBookField,
} from "@/core/config/fieldsData/books/create";
import { useFocus } from "@/core/hooks/hooks";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import ChoseStore from "./components/ChoseStore";
import { BookStoreType } from "@/types/all/bookStore";

type PropsType = {
  handleSave: () => void;
  isPending: boolean;
  stores?: Partial<BookStoreType>[];
};

const BookForm: FC<PropsType> = ({ handleSave, isPending, stores }) => {
  const formCtx = useFormContext();
  const {
    register,
    formState: { errors },
    setFocus,
  } = formCtx;

  useFocus({ setFocus, key: "title" });

  return (
    <form onSubmit={handleSave} className="__cont">
      <OptionalField />

      <ChoseStore {...{ stores }} />

      <WrapperFormField
        {...{ title: "title", sizeStyle: "max-w-[500px] lg:max-w-1/" }}
      >
        <FormField
          {...{ el: titleBookField, register, errors, showLabel: false }}
        />
      </WrapperFormField>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
        {fieldAuthY.map((el) => (
          <FormField {...{ register, errors, el }} />
        ))}
      </div>

      <WrapperFormField
        {...{ title: "Description ~", sizeStyle: "max-w-[500px] lg:max-w-1/2" }}
      >
        <TxtField
          {...{ register, el: fieldDescBook, errors, showLabel: false }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Images ~" }}>
        <ImagesField />
      </WrapperFormField>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
        {fieldsPriceQty.map((el) => (
          <FormField {...{ register, errors, el }} />
        ))}
      </div>

      <div className="w-full max-w-[200px] mt-10">
        <Button {...{ label: "Create", isPending, type: "submit" }} />
      </div>
    </form>
  );
};

export default BookForm;
