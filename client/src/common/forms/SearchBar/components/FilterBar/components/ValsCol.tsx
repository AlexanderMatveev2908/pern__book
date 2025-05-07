import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FilterSubField } from "@/types/types";
import { FC, useCallback } from "react";
import { useFormContext } from "react-hook-form";

const ValsCol: FC = () => {
  const { watch, setValue } = useFormContext();
  const {
    searchers: { currFilter },
  } = useSearchCtx();

  const handleClickVal = useCallback(
    (el: FilterSubField) => {
      const key = currFilter?.field;
      if (!key) return;
      const value = watch(key);

      if (!Array.isArray(value)) {
        setValue(key, [el.val]);
        return null;
      }

      setValue(
        key,
        value.includes(el.val)
          ? value.filter((str) => str !== el.val)
          : [...value, el.val]
      );
    },
    [currFilter, setValue, watch]
  );

  const getIsIn = useCallback(
    ({ key, el }: { key: string; el: FilterSubField }) => {
      const value = watch(key);

      return Array.isArray(value) ? value.includes(el.val) : false;
    },
    [watch]
  );

  return (
    <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full px-6 min-w-full py-3 ">
      <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-5">
        {Array.isArray(currFilter?.fields) &&
          currFilter.fields.every((el) => !!(el as FilterSubField)?.val) &&
          currFilter.fields.map((el) => (
            <div
              key={el.id}
              className="w-full max-w-[200px] justify-self-center"
            >
              <BtnCheckBox
                {...{
                  label: el.label ?? "",
                  isIn: getIsIn({
                    key: currFilter.field,
                    el: el as FilterSubField,
                  }),
                  handleClick: () => handleClickVal(el as FilterSubField),
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ValsCol;
