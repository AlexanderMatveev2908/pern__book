import { FC, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { fieldEmailWorker } from "@/config/fields/OwnerLayout/post";
import { FormField } from "@/components/components";

const TeamForm: FC = () => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    setValue("items", [
      {
        email: "",
        role: null,
      },
    ]);
  }, [setValue]);

  console.log(watch());

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <div className="book_store_sub_form">
        {fields.map((el, i) => (
          <FormField
            key={el.id}
            {...{ register, errors, index: i, el: fieldEmailWorker }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamForm;
