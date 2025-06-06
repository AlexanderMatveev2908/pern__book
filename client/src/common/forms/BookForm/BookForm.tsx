import Button from "@/components/elements/buttons/Button/Button";
import OptionalField from "@/components/elements/OptionalField";
import FormField from "@/components/forms/inputs/baseTxtFields/FormField";
import ImagesField from "@/components/forms/inputs/ImagesField/ImagesField";
import TxtField from "@/components/forms/inputs/TxtField";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import { useFocus } from "@/core/hooks/hooks";
import { useMemo, type FC } from "react";
import { useFormContext } from "react-hook-form";
import ChoseStore from "./components/ChoseStore";
import { BookStoreType, CatBookStore } from "@/types/all/bookStore";
import CheckBoxSwapper from "@/components/forms/layouts/CheckBoxSwapper/CheckBoxSwapper";
import { subcategories } from "@/types/all/books";
import { useLocation } from "react-router-dom";
import {
  fieldAuthY,
  fieldDescBook,
  fieldsPriceQty,
  titleBookField,
} from "@/core/config/fieldsData/books/forms";

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
    control,
    formState: { errors },
    setFocus,
    watch,
    register,
  } = formCtx;

  const storeID = watch("bookStoreID");

  useFocus({ setFocus, key: "title" });

  const categoriesFields: string[] = useMemo(() => {
    const filtered = Object.entries(subcategories).filter((pair) => {
      const currStore = (stores ?? [])?.find((store) => store?.id === storeID);
      if (!currStore) return;

      return currStore?.categories?.includes(pair[0] as CatBookStore);
    });

    return filtered.flatMap((pair) => pair[1]);
  }, [storeID, stores]);

  const path = useLocation()?.pathname;

  return (
    <form onSubmit={handleSave} className="p_form__0">
      <OptionalField
        {...{
          txt: "🟢 Choose the bookstore where you'll add the book. Fields marked in green are required",
        }}
      />

      <ChoseStore {...{ stores }} />

      <WrapperFormField
        {...{
          title: "title",
          sizeStyle: "max-w-[500px] lg:max-w-1/",
          isDisabled: isEmployee,
          styleTxt: !isEmployee ? "text-green-600" : "",
        }}
      >
        <FormField
          {...{
            el: titleBookField,
            control,
            errors,
            showLabel: false,
            isDisabled: isEmployee,
          }}
        />
      </WrapperFormField>

      <WrapperFormField
        {...{
          title: "author & year *",
          isDisabled: isEmployee,
          styleTxt: !isEmployee ? "text-green-600" : "",
        }}
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          {fieldAuthY.map((el) => (
            <FormField
              key={el.id}
              {...{
                control,
                errors,
                el,
                isDisabled: isEmployee,
                styleLabel: !isEmployee ? "text-green-600" : "",
              }}
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

      <WrapperFormField
        {...{
          title: "categories *",
          isDisabled: isEmployee,
          styleTxt: !isEmployee ? "text-green-600" : "",
        }}
      >
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

      <WrapperFormField
        {...{ title: "quantity & price *", styleTxt: "text-green-600" }}
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          {fieldsPriceQty.map((el) => (
            <FormField
              key={el.id}
              {...{
                control,
                errors,
                el,
                isDisabled: el.field === "price" && isEmployee,
                styleLabel:
                  isEmployee && el.field === "price" ? "" : "text-green-600",
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
