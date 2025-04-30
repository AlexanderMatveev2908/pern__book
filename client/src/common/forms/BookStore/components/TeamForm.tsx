/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import MySelect from "@/components/forms/inputs/MySelect";
import { BtnAct, UserRole } from "@/types/types";
import { AiOutlineUserDelete } from "react-icons/ai";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { IoPersonAddOutline } from "react-icons/io5";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import {
  fieldEmailWorker,
  fieldSelectWorkerRole,
} from "@/core/config/fieldsData/OwnerLayout/post";

const btnRemoveWorker = {
  icon: AiOutlineUserDelete,
};
const btnAddWorker = {
  icon: IoPersonAddOutline,
};

const TeamForm: FC = () => {
  const [border, setBorder] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const len = useMemo(() => fields.length, [fields.length]);

  useEffect(() => {
    setValue("items", [
      {
        email: "",
        role: null,
      },
    ]);
  }, [setValue]);
  useEffect(() => {
    const handleBorder = () => {
      if (!parentRef.current) return;
      const parent = parentRef.current;
      const h = parent.offsetHeight;
      if (h > 500 && !border) setBorder(true);
      else if (parent.offsetHeight < 500 && border) setBorder(false);
    };

    handleBorder();
  }, [len, border]);

  const handleClickSelect = (val: UserRole, i: number) => {
    const currVal = getValues(`items.${i}.role`);

    setValue(`items.${i}.role`, currVal === val ? null : val, {
      shouldValidate: true,
    });
  };
  const checkIsIn = useCallback(
    (val: UserRole, i: number) => {
      const vals = getValues("items");
      return vals?.[i]?.role === val;
    },
    [getValues]
  );
  const getCurrVal = useCallback(
    (index: number) => getValues(`items.${index}.role`),
    [getValues]
  );

  const handleAppend = () =>
    append({
      email: "",
      role: null,
    });
  const handleRemove = (i: number) => remove(i);

  const fieldsData = watch("items");
  const isLastOk = useCallback(() => {
    const last =
      Array.isArray(fieldsData) && fieldsData?.length
        ? fieldsData.at(-1)
        : null;

    if (last === null) return true;

    const vals = Object.values(last ?? {});

    return vals.length && vals?.every((val) => typeof val === "string");
  }, [fieldsData]);

  const vals = watch();

  useEffect(() => {
    const handleTeam = () => {
      const team = vals?.items;
      if (!team?.length) return;

      let i = 0;
      while (i < team.length) {
        const curr = team[i];

        if (
          curr.email.trim().length &&
          !curr.role &&
          !(errors as any)?.items?.[i]?.role
        )
          setError(`items.${i}.role`, { message: "Worker need a role" });
        else if (
          curr.email.trim().length &&
          curr.role &&
          (errors as any)?.items?.[i]?.role
        )
          clearErrors(`items.${i}.role`);

        if (
          curr.role &&
          !curr.email.trim()?.length &&
          !(errors as any)?.items?.[i]?.email
        )
          setError(`items.${i}.email`, {
            message: `This ${curr.role} need a role`,
          });
        // else if (
        //   curr.role &&
        //   curr.email.trim().length &&
        //   (errors as any)?.items?.[i]?.email
        // )
        //   clearErrors(`items.${i}.email`);

        i++;
      }
    };

    handleTeam();
  }, [vals, setError, errors, clearErrors]);

  console.log(errors);

  return (
    <div
      ref={parentRef}
      className={`w-full grid grid-cols-1 gap-5 ${
        border
          ? "border-2 p-5 rounded-xl border-blue-600 max-h-[500px] scrollbar__app scrollbar__y overflow-y-scroll"
          : ""
      }`}
    >
      {fields.map((el, i) => (
        <div
          key={el.id}
          className={`w-full grid grid-cols-1 md:grid-cols-[1fr_75px] gap-y-3 gap-x-10 p-4 relative ${
            border ? "" : "border-[2px] border-blue-600 rounded-xl"
          }`}
        >
          <div className="book_store_sub_form ">
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
                register,
                errors,
                handleClick: handleClickSelect,
                checkIsIn,
                currVal: getCurrVal(i),
              }}
            />
          </div>
          <div
            className={`w-[75px] justify-self-end flex items-end absolute  z-20 bg-neutral-950 md:static ${
              border ? "-top-[2%]" : "-top-[10%]"
            }`}
          >
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

      <div className="w-[75px] ml-4">
        <ButtonIcon
          {...{
            el: btnAddWorker,
            handleClick: handleAppend,
            isDisabled: !!(errors as any)?.items?.length || !isLastOk(),
          }}
        />
      </div>
    </div>
  );
};

export default TeamForm;
