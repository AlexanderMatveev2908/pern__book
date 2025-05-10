/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage, saveStorage, setLimitCards } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";

type Params<T extends FieldValues> = {
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
} & SearchCtxValsConsumer &
  UseFormReturn<T>;

export const usePopulateSearch = ({
  txtInputs,
  filters,
  setTxtInputs,
  setArgs,
  setSearch,
  setPreSubmit,
  setValue,
}: Params<any>) => {
  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();

  useEffect(() => {
    const savedVals = getStorage(keyStorageVals);

    // * UPDATE LABELS OF SEARCH BY TEXT
    const savedLabels = JSON.parse(getStorage(keyStorageLabels) ?? "[]");
    const updatedLabels = savedLabels.length ? savedLabels : [txtInputs[0]];
    setTxtInputs(updatedLabels);

    // ? IF NOT LENGTH UPDATE STORAGE TO HAVE FIRST EL
    if (!savedLabels.length)
      saveStorage({ key: keyStorageLabels, data: updatedLabels });

    setSearch({ el: "currFilter", val: filters[0] });

    if (savedVals) {
      const parsed = JSON.parse(savedVals);
      for (const key in parsed) {
        const val = parsed[key];
        if (
          (typeof val === "string" && val.trim().length) ||
          (Array.isArray(val) && val.length)
        )
          setValue(key as Path<any>, val, {
            shouldValidate: true,
            shouldDirty: true,
          });
      }

      // ? HERE AS IN OTHERS PLACES U WILL SE A DISABILITIION OF STATE THAT ALLOW API, IT IS CAUSE I ALREADY MAKE CALL RIGHT NOW SO HAS NO SENSE TO REPEAT IN DEBOUNCE
      setPreSubmit({ el: "canMakeAPI", val: false });

      setArgs({
        ...parsed,
        page: parsed?.page ?? 0,
        limit: setLimitCards(),
      });
    }

    setPreSubmit({ el: "isPopulated", val: true });
  }, [
    setValue,
    setPreSubmit,
    keyStorageVals,
    filters,
    keyStorageLabels,
    setSearch,
    setTxtInputs,
    txtInputs,
    setArgs,
  ]);
};
