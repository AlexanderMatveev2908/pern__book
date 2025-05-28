/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldJoinCatType } from "@/core/contexts/SearchCtx/reducer/initState";
import { captAll } from "@/core/lib/lib";
import { subcategories } from "@/types/all/books";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { v4 } from "uuid";

type Params = {
  watch: UseFormWatch<any>;
  innerJoinedCat: FieldJoinCatType[];
  setInnerJoinedCat: (val: FieldJoinCatType[]) => void;
  preSubmit: any;
};

export const useUpdateJoinCat = ({
  watch,
  innerJoinedCat,
  setInnerJoinedCat,
  preSubmit,
}: Params) => {
  const { hasFormErrs } = preSubmit ?? {};
  const mainCatRealTime = watch("mainCategories");

  useEffect(() => {
    const mainCat = mainCatRealTime ?? [];

    if (mainCat.length && !innerJoinedCat.length && !hasFormErrs) {
      const updatedJoinedFields: FieldJoinCatType[] = Object.entries(
        subcategories
      )
        .filter(([k]) => mainCat.includes(k))
        // eslint-disable-next-line
        .flatMap(([_, v]) =>
          v.map((sub) => ({
            id: v4(),
            val: sub,
            label: captAll(sub),
          }))
        );

      setInnerJoinedCat(updatedJoinedFields);
    }
  }, [mainCatRealTime, innerJoinedCat, setInnerJoinedCat, hasFormErrs]);

  return {};
};
