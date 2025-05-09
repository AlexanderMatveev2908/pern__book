import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useGetSearchKeysStorage } from "@/core/hooks/all/searchBar/useGetSearchKeysStorage";
import { getStorage, saveStorage } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Params = {
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
};

export const usePopulateSearch = ({ txtInputs, filters }: Params) => {
  const { setValue } = useFormContext();

  const { setTxtInputs, setSearch, setPagination } = useSearchCtx();
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

      setPagination({
        el: "page",
        val: parsed?.page ?? 0,
      });
      setPagination({
        el: "block",
        val: parsed?.block ?? 0,
      });
    }
  }, [
    setValue,
    keyStorageVals,
    filters,
    keyStorageLabels,
    setSearch,
    setTxtInputs,
    txtInputs,
    setPagination,
  ]);
};
