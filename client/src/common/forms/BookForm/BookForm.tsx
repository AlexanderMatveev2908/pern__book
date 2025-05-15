import OptionalField from "@/components/elements/OptionalField";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import { titleBookField } from "@/core/config/fieldsData/books/create";
import { useFocus } from "@/core/hooks/hooks";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {};

const BookForm: FC<PropsType> = ({}) => {
  const formCtx = useFormContext();
  const {
    register,
    formState: { errors },
    setFocus,
  } = formCtx;

  useFocus({ setFocus, key: "title" });

  return (
    <div className="__cont">
      <OptionalField />

      <WrapperFormField
        {...{ title: "title", sizeStyle: "max-w-[500px] lg:max-w-1/" }}
      >
        <FormField
          {...{ el: titleBookField, register, errors, showLabel: false }}
        />
      </WrapperFormField>
    </div>
  );
};

export default BookForm;
