/* eslint-disable @typescript-eslint/no-explicit-any */
import BtnCheckBox from "@/components/forms/inputs/BtnCheckBox/BtnCheckBox";
import FormField from "@/components/forms/inputs/FormFields/FormField";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useUpdateJoinCat } from "@/core/hooks/all/forms/searchBar/useUpdateJoinCat";
import { FilterSubField, FormFieldBasic } from "@/types/types";
import { FC, useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  innerJoinCat?: boolean;
};

const ValsCol: FC<PropsType> = ({ innerJoinCat }) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
    trigger: triggerRHF,
  } = useFormContext();
  const {
    searchers: { currFilter },
    setInnerJoinedCat,
    innerJoinedCatCtx,
  } = useSearchCtx();

  const { updateJoinCat } = useUpdateJoinCat();

  const mainCatRealTime = watch("mainCategories");

  const handleClickVal = useCallback(
    (el: FilterSubField) => {
      const key = currFilter?.field;
      if (!key) return;

      const value = watch(key);

      if (key === "mainCategories" && innerJoinCat)
        updateJoinCat({ value, el, setInnerJoinedCat });

      if (!Array.isArray(value)) {
        setValue(key, [el.val], {
          shouldValidate: true,
        });
        return null;
      }

      setValue(
        key,
        value.includes(el.val)
          ? value.filter((str) => str !== el.val)
          : [...value, el.val],
        {
          shouldValidate: true,
        }
      );
    },
    [
      currFilter,
      setValue,
      watch,
      innerJoinCat,
      updateJoinCat,
      setInnerJoinedCat,
    ]
  );

  const getIsIn = useCallback(
    ({ key, el }: { key: string; el: FilterSubField }) => {
      const value = watch(key);

      return Array.isArray(value) ? value.includes(el.val) : false;
    },
    [watch]
  );

  // ? A NORMAL FIELD IS LIKE JUST A BTN TO CLICK, NOT A WHOLE INPUT TO TYPE WITH ERR ECC...

  const isNormalField = useMemo(() => {
    if (!Array.isArray(currFilter?.fields)) return false;

    return currFilter.fields.every(
      (el) => "val" in el && typeof el.val === "string"
    );
  }, [currFilter]);

  const argNormalField = useMemo(
    () =>
      currFilter?.field === "subCategories" &&
      innerJoinCat &&
      mainCatRealTime?.length
        ? { label: "subCategories", fields: innerJoinedCatCtx }
        : currFilter,
    [currFilter, mainCatRealTime, innerJoinCat, innerJoinedCatCtx]
  );

  return (
    <div className="scroll_app scroll_y overflow-y-auto  max-h-full px-6 min-w-full py-3 ">
      <div
        className={`min-w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10  ${
          isNormalField
            ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5"
            : "md:grid-cols-2 h-fit items-start gap-y-2"
        }`}
      >
        {!Array.isArray(currFilter?.fields)
          ? null
          : isNormalField
          ? (argNormalField as any)?.fields.map((el: FilterSubField) => (
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
          : currFilter.fields.map((el: any) => (
              <FormField
                key={el.id}
                {...{
                  el: el,
                  register,
                  errors,
                  styleContErr: {
                    top: "-100%",
                    right: "0%",
                  },
                  customCB: () => {
                    const obj = {
                      min: "max",
                      max: "min",
                    };

                    const str = el.field.includes("min") ? "min" : "max";

                    triggerRHF(el.field.replace(str, obj[str]));
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
