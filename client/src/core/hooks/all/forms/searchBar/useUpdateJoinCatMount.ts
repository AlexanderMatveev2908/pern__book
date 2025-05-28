/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldJoinCatType } from "@/core/contexts/SearchCtx/reducer/initState";
import { filterInnerSubCat } from "@/core/lib/all/utils/processData";
import { useEffect, useMemo } from "react";
import { UseFormWatch } from "react-hook-form";

type Params = {
  watch: UseFormWatch<any>;
  innerJoinedCatCtx: FieldJoinCatType[];
  setInnerJoinedCat: (val: FieldJoinCatType[]) => void;
};

export const useUpdateJoinCatMount = ({
  watch,
  innerJoinedCatCtx,
  setInnerJoinedCat,
}: Params) => {
  const realTimeCat = watch("mainCategories");
  const mainCat = useMemo(() => realTimeCat ?? [], [realTimeCat]);

  useEffect(() => {
    if (mainCat.length && !innerJoinedCatCtx.length) {
      const updatedJoinedFields: FieldJoinCatType[] =
        filterInnerSubCat(mainCat);

      setInnerJoinedCat(updatedJoinedFields);
    }
  }, [mainCat, innerJoinedCatCtx, setInnerJoinedCat]);

  return {};
};
