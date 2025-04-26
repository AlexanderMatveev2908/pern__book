import { FormField, Title } from "@/components/components";
import { fieldNameStore } from "@/config/fields/OwnerLayout/post";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

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
    <form onSubmit={handleSave} className="__cont">
      <div className="w-full grid gap-5">
        <Title
          {...{
            title: "Bookstore name",
            styleTxt: "txt__3",
            styleParent: "justify-start",
          }}
        />

        <div className="w-full flex max-w-[600px]">
          <FormField
            {...{ register, errors, el: fieldNameStore, showLabel: false }}
          />
        </div>
      </div>
    </form>
  );
};

export default BookStoreForm;
