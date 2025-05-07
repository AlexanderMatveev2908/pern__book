import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { FilterSubField, FormFieldBasic } from "@/types/types";
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const ValsCol: FC = () => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
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

  const isNormalField = useMemo(() => {
    if (!Array.isArray(currFilter?.fields)) return false;

    return currFilter.fields.every(
      (el) => "val" in el && typeof el.val === "string"
    );
  }, [currFilter]);

  return (
    <div className="scrollbar__app scrollbar__y overflow-y-auto  max-h-full px-6 min-w-full py-3 ">
      <div
        className={`min-w-full grid grid-cols-1 gap-x-10  ${
          isNormalField
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5"
            : "md:grid-cols-2 h-fit items-start gap-y-2"
        }`}
      >
        {!Array.isArray(currFilter?.fields)
          ? null
          : currFilter.fields.every(
              (el) =>
                !!(el as FilterSubField)?.val &&
                typeof (el as FilterSubField)?.val === "string"
            )
          ? currFilter.fields.map((el) => (
              <div
                key={el.id}
                className="w-full max-w-[200px] justify-self-center h-fit items-start"
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
            ))
          : currFilter.fields.map((el) => (
              <FormField
                key={el.id}
                {...{
                  el: el as FormFieldBasic,
                  register,
                  errors,
                  styleContErr: {
                    top: "-100%",
                    right: "0%",
                  },
                }}
              >
                <div className="w-full flex justify-start  items-center mt-3">
                  <span className="txt__1 text-red-600">
                    {errors?.[(el as FormFieldBasic).field]?.message as string}
                  </span>
                </div>
              </FormField>
            ))}
      </div>
    </div>
  );
};

export default ValsCol;
