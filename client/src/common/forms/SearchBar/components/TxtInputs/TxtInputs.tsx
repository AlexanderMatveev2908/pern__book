/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useCallback } from "react";
import ButtonIcon from "@/components/elements/buttons/ButtonIcon/ButtonIcon";
import { FaSearchMinus } from "react-icons/fa";
import { BtnAct, FormFieldBasic } from "@/types/types";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { UseFormReturn } from "react-hook-form";
import { getDefValsPagination, saveStorage } from "@/core/lib/lib";
import { useGetSearchKeysStorage } from "@/core/hooks/all/forms/searchBar/useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type PropsType = {
  children: ReactNode;
  ctx: SearchCtxValsConsumer;
  formCtx: UseFormReturn<any>;
};

const removeFieldBtn = {
  icon: FaSearchMinus,
};

const TxtInputs: FC<PropsType> = ({ children, ctx, formCtx }) => {
  const { keyStorageLabels } = useGetSearchKeysStorage();

  const { activeTxtInputs, setTxtInputs, args, updateValsNoDebounce } = ctx;
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = formCtx;

  const filterLabels = useCallback(
    (el: FormFieldBasic) => {
      const filtered = activeTxtInputs.filter((val) => val.field !== el.field);
      setTxtInputs(filtered);
      saveStorage({ key: keyStorageLabels, data: filtered });
    },
    [activeTxtInputs, keyStorageLabels, setTxtInputs]
  );

  const handleRemove = useCallback(
    (el: FormFieldBasic) => {
      const data = {
        ...getValues(),
        ...getDefValsPagination(args),
        [el.field]: "",
      };

      filterLabels(el);

      if (!getValues(el.field)?.trim()?.length) return;

      updateValsNoDebounce({ vals: data });

      setValue(el.field, "", { shouldValidate: true });
    },
    [args, setValue, updateValsNoDebounce, getValues, filterLabels]
  );

  return (
    <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
      {activeTxtInputs.map((el) => (
        <div key={el.id} className="w-full flex gap-5 sm:gap-10">
          <FormField
            {...{
              el,
              showLabel: false,
              register,
              errors,
              customStyle: "input__lg",
              styleContErr: { top: "-75%", right: "-0%" },
            }}
          />

          <div className="w-full max-w-[75px]">
            <ButtonIcon
              {...{
                el: removeFieldBtn,
                act: BtnAct.DEL,
                handleClick: () => handleRemove(el),
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
