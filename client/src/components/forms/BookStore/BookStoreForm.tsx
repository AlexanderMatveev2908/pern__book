import { FormField } from "@/components/components";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import {
  fieldDescStore,
  fieldNameStore,
} from "@/config/fields/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import TxtField from "../components/inputs/TxtField";
import VideoField from "../components/inputs/VideoField";
import ImagesField from "../components/inputs/ImagesField/ImagesField";
import CheckBoxSwapper from "../components/CheckBoxSwapper/CheckBoxSwapper";
import { CatBookStore } from "@/types/all/bookStore";

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
  } = ctx;

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
    </form>
  );
};

export default BookStoreForm;
