/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback, useEffect, useMemo } from "react";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaSearchMinus } from "react-icons/fa";
import { BtnAct, FormFieldBasic, ItemFieldsArrType } from "@/types/types";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { getDefValsPagination } from "@/core/lib/lib";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";

type PropsType = {
  children: ReactNode;
  trigger: any;
  txtInputs: FormFieldBasic[];
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const TxtInputs: FC<PropsType> = ({ trigger, children, txtInputs }) => {
  const { updateValsNoDebounce } = useSearchCtx();
  const {
    register,
    formState: { errors },
    control,
    getValues,
    watch,
  } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name: "items",
  });

  const arg = watch("items") ?? [];

  const handleRemove = useCallback(
    (el: ItemFieldsArrType, i: number) => {
      // const data = {
      //   ...getValues(),
      //   items: fields.filter((f) => f.id !== el.id),
      //   ...getDefValsPagination(),
      // };
      remove(i);

      // if (!getValues(el.field)?.trim()?.length) return;

      // updateValsNoDebounce({ vals: data, trigger });
    },
    [remove]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
      {arg.map((el: ItemFieldsArrType, i: number) => (
        <div key={el?.id} className="w-full flex gap-5 sm:gap-10">
          <FormField
            {...({
              el,
              showLabel: false,
              register,
              errors,
              customStyle: "input__lg",
              styleContErr: { top: "-75%", right: "-0%" },
              nestedIndex: {
                index: i,
                key: "val",
              },
            } as any)}
          />

          <div className="w-full max-w-[75px]">
            <ButtonIcon
              {...{
                el: removeFieldBtn,
                act: BtnAct.DEL,
                handleClick: () => handleRemove(el, i),
              }}
            />
          </div>
        </div>
      ))}

      {children}
    </div>
  );
};

export default TxtInputs;
