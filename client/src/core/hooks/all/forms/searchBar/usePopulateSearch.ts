/* eslint-disable @typescript-eslint/no-explicit-any */
import { cpyObj, getStorage } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect, useRef } from "react";
import { FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { getDefValsPagination } from "@/core/lib/lib";
import { v4 } from "uuid";

type Params<T extends FieldValues> = {
  txtInputs?: FormFieldBasic[];
  filters?: FilterSearch[];
  ctx: SearchCtxValsConsumer;
  setValue: UseFormSetValue<T>;
  trigger: any;
};
export const usePopulateSearch = ({
  txtInputs,
  filters,
  ctx,
  setValue,
  trigger,
}: Params<any>) => {
  const hasRun = useRef<boolean>(false);
  const { keyStorageLabels, keyStorageVals } = useGetSearchKeysStorage();
  const { setPagination, setSearch, oldVals, setPreSubmit } = ctx;

  useEffect(() => {
    if (!txtInputs?.length || !filters?.length) return;

    if (hasRun.current) return;
    hasRun.current = true;

    setSearch({ el: "currFilter", val: filters[0] });

    const savedVals = getStorage(keyStorageVals);
    const fallBackItems = { ...cpyObj(txtInputs[0]), val: "", id: v4() };

    if (!savedVals) {
      const defVals = {
        items: [fallBackItems],
        ...getDefValsPagination(),
      };
      setValue("items", [fallBackItems], { shouldValidate: true });
      oldVals.current = cpyObj(defVals) as any;
      trigger(defVals);
      setPreSubmit({ el: "isPopulated", val: true });
      return;
    }

    const parsed = JSON.parse(savedVals);
    if (!parsed?.items?.length) parsed.items = [fallBackItems];

    for (const key in parsed) {
      const val = parsed[key];

      setValue(key as Path<any>, val, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    // ? HERE AS IN OTHERS PLACES U WILL SE A DISABILITIION OF STATE THAT ALLOW API, IT IS CAUSE I ALREADY MAKE CALL RIGHT NOW SO HAS NO SENSE TO REPEAT IN DEBOUNCE

    setPagination({ el: "page", val: parsed?.page ?? 0 });

    const merged = {
      ...parsed,
      ...getDefValsPagination(parsed?.page),
    };

    oldVals.current = merged;
    trigger(merged);

    setPreSubmit({ el: "isPopulated", val: true });
  }, [
    trigger,
    setValue,
    keyStorageVals,
    filters,
    keyStorageLabels,
    setSearch,
    txtInputs,
    setPreSubmit,
    setPagination,
    oldVals,
  ]);
};
