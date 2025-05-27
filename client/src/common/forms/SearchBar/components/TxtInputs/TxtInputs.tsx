/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback } from "react";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaSearchMinus } from "react-icons/fa";
import { BtnAct, FormFieldBasic } from "@/types/types";
import { cpyObj, getDefValsPagination } from "@/core/lib/lib";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import FormFieldNested from "@/components/forms/inputs/FormFields/FormFieldNested";

type PropsType = {
  children: ReactNode;
  triggerRtk: any;
  txtInputs?: FormFieldBasic[];
  routeID?: string;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const TxtInputs: FC<PropsType> = ({ triggerRtk, children, routeID }) => {
  const { preSubmit, updateValsNoDebounce, setPreSubmit } = useSearchCtx();
  const {
    formState: { errors },
    control,
    getValues,
    watch,
    setValue,
  } = useFormContext();

  const { remove } = useFieldArray({
    control,
    name: "items",
  });

  const fields = watch("items");

  const handleRemove = useCallback(
    (el: FormFieldBasic, i: number) => {
      const argFb = fields ?? [];
      const currVals = getValues();

      const hasSenseFetch = currVals.items?.[i]?.val?.trim()?.length;
      if (!hasSenseFetch) setPreSubmit({ el: "canMakeAPI", val: false });

      remove(i);

      const data = cpyObj({
        ...currVals,
        items: argFb.filter((f: FormFieldBasic) => f.id !== el.id),
        ...getDefValsPagination(),
      });

      if (hasSenseFetch)
        updateValsNoDebounce({ vals: data, triggerRtk, routeID });
    },
    [
      remove,
      fields,
      getValues,
      triggerRtk,
      updateValsNoDebounce,
      setPreSubmit,
      routeID,
    ]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
      {(fields ?? []).map((el: FormFieldBasic, i: number) => (
        <div key={el?.id} className="w-full flex gap-5 sm:gap-10">
          <FormFieldNested
            {...({
              el,
              showLabel: false,
              errors,
              customStyle: "input__lg",
              styleContErr: { top: "-75%", right: "-0%" },
              nestedIndex: {
                index: i,
                key: "val",
              },
              setValue,
              getValues,
              watch,
              customCB: () => {
                if (!preSubmit.canMakeAPI)
                  setPreSubmit({ el: "canMakeAPI", val: true });
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
