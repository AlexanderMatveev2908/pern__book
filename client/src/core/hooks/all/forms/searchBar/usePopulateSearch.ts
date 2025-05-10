import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { getStorage, saveStorage, setLimitCards } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";

type Params = {
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
};

export const usePopulateSearch = ({ txtInputs, filters }: Params) => {
  const { setValue } = useFormContext();

  const { setTxtInputs, setArgs, setSearch, setPreSubmit } = useSearchCtx();
  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();

  useEffect(() => {
    const savedVals = getStorage(keyStorageVals);

    const savedLabels = JSON.parse(getStorage(keyStorageLabels) ?? "[]");
    const updatedLabels = savedLabels.length ? savedLabels : [txtInputs[0]];
    setTxtInputs(updatedLabels);

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
          setValue(key, val, {
            shouldValidate: true,
            shouldDirty: true,
          });
      }

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
