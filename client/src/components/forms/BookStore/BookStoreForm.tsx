import { FormField } from "@/components/components";
import WrapperFormField from "@/components/HOC/WrapperFormField";
import {
  fieldDescStore,
  fieldNameStore,
} from "@/config/fields/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import TxtField from "../components/inputs/TxtField";

type PropsType = {
  handleSave: () => void;
};

const BookStoreForm: FC<PropsType> = ({ handleSave }) => {
  const ctx = useFormContext();
  const {
    register,
    formState: { errors },
  } = ctx;

  return (
    <form onSubmit={handleSave} className="__cont gap-6">
      <div className="w-full flex justify-end">
        <span className="txt__1 border-b-[3px] border-blue-600 pb-1">
          Fields with * near name are optional
        </span>
      </div>

      <WrapperFormField {...{ title: "bookstore name" }}>
        <FormField
          {...{ register, errors, el: fieldNameStore, showLabel: false }}
        />
      </WrapperFormField>

      <WrapperFormField {...{ title: "Description *" }}>
        <TxtField
          {...{ register, errors, el: fieldDescStore, showLabel: false }}
        />
      </WrapperFormField>
    </form>
  );
};

export default BookStoreForm;
