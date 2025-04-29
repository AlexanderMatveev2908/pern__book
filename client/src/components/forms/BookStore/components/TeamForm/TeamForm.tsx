import { FC, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  fieldEmailWorker,
  fieldSelectWorkerRole,
} from "@/config/fields/OwnerLayout/post";
import { FormField } from "@/components/components";
import MySelect from "@/components/forms/components/inputs/MySelect";
import { BtnAct, UserRole } from "@/types/types";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineUserDelete } from "react-icons/ai";
import ButtonIcon from "@/components/common/buttons/ButtonIcon/ButtonIcon";

const btnRemoveWorker = {
  label: "Remove",
  icon: AiOutlineUserDelete,
};

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
    const currVal = getValues(`items.${i}.role`);
    setValue(`items.${i}.role`, currVal === val ? null : val, {
      shouldValidate: true,
    });
  };
  const checkIsIn = (val: UserRole, i: number) => {
    const vals = getValues("items");
    return vals?.[i]?.role === val;
  };
  const getCurrVal = (index: number) => getValues(`items.${index}.role`);

  console.log(watch());
  console.log(errors);

  return (
    <div className="w-full grid ">
      {fields.map((el, i) => (
        <div
          key={el.id}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 p-4 border-[3px] border-blue-600 rounded-xl"
        >
          <div className="book_store_sub_form">
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
          <div className="w-[250px] justify-self-center">
            <ButtonIcon
              {...{
                handleClick: () => console.log("todo"),
                el: btnRemoveWorker,
                act: BtnAct.DEL,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamForm;
