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
} from "@/core/config/fieldsData/OwnerLayout/books/create";
import { useFocus } from "@/core/hooks/hooks";
import { useMemo, type FC } from "react";
import { useFormContext } from "react-hook-form";
import ChoseStore from "./components/ChoseStore";
import { BookStoreType, CatBookStore } from "@/types/all/bookStore";
import CheckBoxSwapper from "@/components/forms/layouts/CheckBoxSwapper/CheckBoxSwapper";
import { subcategories } from "@/types/all/books";
import { useLocation } from "react-router-dom";

type PropsType = {
  handleSave: () => void;
  isPending: boolean;
  stores?: Partial<BookStoreType>[];
  isDisabled?: boolean;
  isEmployee?: boolean;
};

const BookForm: FC<PropsType> = ({
  handleSave,
  isPending,
  stores,
  isDisabled,
  isEmployee,
}) => {
  const formCtx = useFormContext();
  const {
    register,
    formState: { errors },
    setFocus,
    watch,
  } = formCtx;

  const storeID = watch("bookStoreID");

  useFocus({ setFocus, key: "title" });

  const categoriesFields: string[] = useMemo(() => {
    const filtered = Object.entries(subcategories).filter((pair) => {
      const currStore = stores?.find((store) => store.id === storeID);
      if (!currStore) return;

      return currStore?.categories?.includes(pair[0] as CatBookStore);
    });

    return filtered.flatMap((pair) => pair[1]);
  }, [storeID, stores]);

  const path = useLocation()?.pathname;

  return (
    <form onSubmit={handleSave} className="__cont">
      <OptionalField />

      <ChoseStore {...{ stores }} />

      <WrapperFormField
        {...{
          title: "title",
          sizeStyle: "max-w-[500px] lg:max-w-1/",
          isDisabled: isEmployee,
        }}
      >
        <FormField
          {...{
            el: titleBookField,
            register,
            errors,
            showLabel: false,
            isDisabled: isEmployee,
          }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "author & year", isDisabled: isEmployee }}>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          {fieldAuthY.map((el) => (
            <FormField
              key={el.id}
              {...{ register, errors, el, isDisabled: isEmployee }}
            />
          ))}
        </div>
      </WrapperFormField>

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

      <WrapperFormField {...{ title: "categories", isDisabled: isEmployee }}>
        {storeID ? (
          <CheckBoxSwapper
            {...{
              keyForm: "categories",
              maxData: 3,
              fieldsArg: categoriesFields,
              isDisabled: isEmployee,
            }}
          />
        ) : (
          <span className="txt__1 -mt-2 text-red-600">
            To generate categories we need to know to which store you will add
            the book
          </span>
        )}
      </WrapperFormField>

      <WrapperFormField {...{ title: "quantity & price" }}>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          {fieldsPriceQty.map((el) => (
            <FormField
              key={el.id}
              {...{
                register,
                errors,
                el,
                isDisabled: el.field === "price" && isEmployee,
              }}
            />
          ))}
        </div>
      </WrapperFormField>

      <div className="w-full max-w-[225px] mt-10">
        <Button
          {...{
            label: path?.includes("add") ? "Create" : "Update",
            isAging: isPending,
            type: "submit",
            isDisabled,
          }}
        />
      </div>
    </form>
  );
};

export default BookForm;
