import { FieldJoinCatType } from "@/core/contexts/SearchCtx/reducer/initState";
import { filterInnerSubCat } from "@/core/lib/all/utils/processData";
import { FilterSubField } from "@/types/types";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

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

      const updatedJoinedFields: FieldJoinCatType[] =
        filterInnerSubCat(updatedMainCat);

      const currSubCategories = getValues("subCategories") ?? [];
      // ? GET JUST VAL TO WORK WITH STRINGS
      const updatedSubCatStrSet = new Set(
        updatedJoinedFields.map((el) => el.val)
      );
      const newValsSubCat = currSubCategories.filter((el: string) =>
        updatedSubCatStrSet.has(el)
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
