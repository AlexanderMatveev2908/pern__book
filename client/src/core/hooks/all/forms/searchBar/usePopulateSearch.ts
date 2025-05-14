/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStorage, saveStorage } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { getDefValsPagination } from "@/core/lib/lib";

type Params<T extends FieldValues> = {
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
  ctx: SearchCtxValsConsumer;
  setValue: UseFormSetValue<T>;
};
export const usePopulateSearch = ({
  txtInputs,
  filters,
  ctx,
  setValue,
}: Params<any>) => {
  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();
  const { setTxtInputs, updateValsNoDebounce, setSearch, setPreSubmit } = ctx;

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

      updateValsNoDebounce({
        vals: {
          ...parsed,
          ...getDefValsPagination(parsed?.page),
          [txtInputs[0].field]: parsed[txtInputs[0].field] ?? "",
        },
      });
    } else {
      updateValsNoDebounce({
        vals: {
          ...getDefValsPagination(),
          [txtInputs[0].field]: "",
        },
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
    updateValsNoDebounce,
  ]);
};
