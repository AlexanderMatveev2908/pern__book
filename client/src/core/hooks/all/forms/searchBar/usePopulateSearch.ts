/* eslint-disable @typescript-eslint/no-explicit-any */
import { cpyObj, getStorage, isObjOk, isStr } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect, useRef } from "react";
import {
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { getDefValsPagination } from "@/core/lib/lib";
import { v4 } from "uuid";
import { REG_ID } from "@/core/config/regex";

type Params<T extends FieldValues> = {
  txtInputs?: FormFieldBasic[];
  filters?: FilterSearch[];
  ctx: SearchCtxValsConsumer;
  setValue: UseFormSetValue<T>;
  triggerRtk: any;
  getValues: UseFormGetValues<T>;
  routeID?: string;
  defVals?: any;
};
export const usePopulateSearch = ({
  txtInputs,
  filters,
  ctx,
  setValue,
  getValues,
  triggerRtk,
  routeID,
  defVals,
}: Params<any>) => {
  const hasRun = useRef<boolean>(false);
  const { keyStorage } = useGetSearchKeysStorage();
  const { setPagination, setSearch, oldVals, setPreSubmit } = ctx;

  useEffect(() => {
    if (
      !txtInputs?.length ||
      !filters?.length ||
      (isStr(routeID) && !REG_ID.test(routeID ?? ""))
    )
      return;

    if (hasRun.current) return;
    hasRun.current = true;

    setSearch({ el: "currFilter", val: filters[0] });

    const savedVals = getStorage(keyStorage as any);
    const existingItems = cpyObj(getValues("items") ?? []);
    const fallBackItems = [{ ...txtInputs[0], val: "", id: v4() }];

    // ? fb = fallback
    if (!savedVals) {
      const valsFb = cpyObj({
        items: existingItems.length ? existingItems : fallBackItems,
        ...getDefValsPagination(),
        ...defVals,
      });
      setValue("items", valsFb.items, { shouldValidate: true });
      if (isObjOk(defVals)) {
        for (const k in defVals)
          setValue(k as Path<any>, defVals[k], {
            shouldValidate: true,
            shouldDirty: true,
          });
      }

      oldVals.current = valsFb;
      triggerRtk({ vals: valsFb, routeID });
      setPreSubmit({ el: "isPopulated", val: true });
      return;
    }

    const storageData = JSON.parse(savedVals);
    const parsed = cpyObj({
      ...storageData,
      items: existingItems.length
        ? existingItems
        : storageData?.items?.length
        ? storageData.items
        : fallBackItems,
    });

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
    triggerRtk({ vals: merged, routeID });

    setPreSubmit({ el: "isPopulated", val: true });
  }, [
    triggerRtk,
    getValues,
    setValue,
    keyStorage,
    filters,
    setSearch,
    txtInputs,
    setPreSubmit,
    setPagination,
    oldVals,
    routeID,
    defVals,
  ]);
};
