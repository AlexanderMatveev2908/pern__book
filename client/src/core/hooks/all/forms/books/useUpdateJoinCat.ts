import { FieldJoinCatType } from "@/core/contexts/SearchCtx/reducer/initState";
import { captAll } from "@/core/lib/lib";
import { subcategories } from "@/types/all/books";
import { FilterSubField } from "@/types/types";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { v4 } from "uuid";

type Params = {
  value?: string[];
  el: FilterSubField;
  setInnerJoinedCat: (val: FieldJoinCatType[]) => void;
};

export const useUpdateJoinCat = () => {
  const { getValues, setValue } = useFormContext();

  const updateJoinCat = useCallback(
    ({ value, el, setInnerJoinedCat }: Params) => {
      const currentMainCat = value ?? [];
      const updatedMainCat: string[] = currentMainCat.includes(el.val)
        ? currentMainCat.filter((str: string) => str !== el.val)
        : [...currentMainCat, el.val];

      const updatedJoinedFields: FieldJoinCatType[] = Object.entries(
        subcategories
      )
        .filter(([k]) => updatedMainCat.includes(k))
        // eslint-disable-next-line
        .flatMap(([_, v]) =>
          v.map((sub) => ({
            id: v4(),
            val: sub,
            label: captAll(sub),
          }))
        );

      const currSubCategories = getValues("subCategories") ?? [];
      // ? GET JUST VAL TO WORK WITH STRINGS
      const updatedSubCatVals = new Set(
        updatedJoinedFields.map((el) => el.val)
      );
      const newValsSubCat = currSubCategories.filter((el: string) =>
        updatedSubCatVals.has(el)
      );
      if (newValsSubCat.length !== currSubCategories.length)
        setValue("subCategories", newValsSubCat, { shouldValidate: true });

      setInnerJoinedCat(updatedJoinedFields);
    },
    [getValues, setValue]
  );

  return {
    updateJoinCat,
  };
};
