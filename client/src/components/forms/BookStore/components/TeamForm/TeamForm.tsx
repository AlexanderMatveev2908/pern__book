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
import { IoPersonAddOutline } from "react-icons/io5";

const btnRemoveWorker = {
  icon: AiOutlineUserDelete,
};
const btnAddWorker = {
  icon: IoPersonAddOutline,
};

const TeamForm: FC = () => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
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

  const handleAppend = () =>
    append({
      email: "",
      role: null,
    });
  const handleRemove = (i: number) => remove(i);

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      {fields.map((el, i) => (
        <div
          key={el.id}
          className="w-full grid grid-cols-1 lg:grid-cols-[1fr_100px] gap-y-3 gap-x-10 p-4 border-[3px] border-blue-600 rounded-xl"
        >
          <div className="book_store_sub_form">
            <FormField
              {...{
                register,
                errors,
                index: i,
                el: fieldEmailWorker,
                customStyle: "input__lg",
              }}
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
          <div className="w-[100px] justify-self-end flex items-end">
            <ButtonIcon
              {...{
                handleClick: () => handleRemove(i),
                el: btnRemoveWorker,
                act: BtnAct.DEL,
              }}
            />
          </div>
        </div>
      ))}

      <div className="w-[100px]">
        <ButtonIcon {...{ el: btnAddWorker, handleClick: handleAppend }} />
      </div>
    </div>
  );
};

export default TeamForm;
