import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FormFieldBasic } from "@/types/types";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";

const ValsCol: FC = () => {
  const { watch, setValue } = useFormContext();
  const {
    searchers: { currFilter },
  } = useSearchCtx();

  const handleClickVal = useCallback(
    (el: FormFieldBasic) => {
      const key = currFilter?.field;
      if (!key) return;
      const value = watch(key);

      if (!Array.isArray(value)) {
        setValue(key, [el.field]);
        return null;
      }

      setValue(
        key,
        value.includes(el.field)
          ? value.filter((str) => str !== el.field)
          : [...value, el.field]
      );
    },
    [currFilter, setValue, watch]
  );

  const getIsIn = useCallback(
    ({ key, el }: { key: string; el: FormFieldBasic }) => {
      const value = watch(key);

      return Array.isArray(value) ? value.includes(el.field) : false;
    },
    [watch]
  );

  return (
    <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full px-6 min-w-full py-3 ">
      <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-5">
        {Array.isArray(currFilter?.fields) &&
          currFilter.fields.map((el) => (
            <div
              key={el.id}
              className="w-full max-w-[200px] justify-self-center"
            >
              <BtnCheckBox
                {...{
                  label: el.label ?? "",
                  isIn: getIsIn({ key: currFilter.field, el }),
                  handleClick: () => handleClickVal(el),
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ValsCol;
