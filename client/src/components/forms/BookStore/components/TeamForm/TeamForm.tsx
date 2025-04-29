import { FC, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  fieldEmailWorker,
  fieldSelectWorkerRole,
} from "@/config/fields/OwnerLayout/post";
import { FormField } from "@/components/components";
import MySelect from "@/components/forms/components/inputs/MySelect";
import { UserRole } from "@/types/types";

const TeamForm: FC = () => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
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

  const handleClickSelect = (val: UserRole, i: number) => {
    setValue(`items.${i}.role`, val);
  };
  const checkIsIn = (val: UserRole, i: number) => {
    const vals = getValues("items");
    return vals?.[i]?.role === val;
  };
  const getCurrVal = (index: number) => getValues(`items.${index}.role`);

  console.log(watch());

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      {fields.map((el, i) => (
        <div key={el.id} className="book_store_sub_form">
          <FormField
            {...{ register, errors, index: i, el: fieldEmailWorker }}
          />

          <MySelect
            {...{
              index: i,
              el: fieldSelectWorkerRole,
              errors,
              handleClick: handleClickSelect,
              checkIsIn,
              currVal: getCurrVal(i),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TeamForm;
