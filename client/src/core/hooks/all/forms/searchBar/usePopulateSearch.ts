/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cpyObj, getStorage, isObjOk, isStr } from "@/core/lib/lib";
import { FilterSearch, FormFieldBasic } from "@/types/types";
import { useEffect, useRef } from "react";
import { Path, useFormContext } from "react-hook-form";
import { useGetSearchKeysStorage } from "./useGetSearchKeysStorage";
import { SearchCtxValsConsumer } from "@/core/contexts/SearchCtx/hooks/useSearchCtxVals";
import { getDefValsPagination } from "@/core/lib/lib";
import { v4 } from "uuid";
import { REG_ID } from "@/core/config/regex";
import { ZodEffects, ZodObject } from "zod";

type Params = {
  txtInputs?: FormFieldBasic[];
  filters?: FilterSearch[];
  ctx: SearchCtxValsConsumer;
  triggerRtk: any;
  routeID?: string;
  defVals?: any;
  schema: ZodEffects<ZodObject<any, any, any>>;
};
export const usePopulateSearch = ({
  txtInputs,
  filters,
  ctx,
  triggerRtk,
  routeID,
  defVals,
  schema,
}: Params) => {
  const hasRun = useRef<boolean>(false);
  const { keyStorage } = useGetSearchKeysStorage();
  const { setPagination, setSearch, oldVals, setPreSubmit } = ctx;

  const { setValue, getValues, reset, trigger: triggerRHF } = useFormContext();

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
    const existingItems = getValues("items") ?? [];
    const fallBackItems = [{ ...txtInputs[0], val: "", id: v4() }];

    // ? fb = fallback
    if (!savedVals) {
      const valsFb = cpyObj({
        items: existingItems.length ? existingItems : fallBackItems,
        ...getDefValsPagination(),
        ...defVals,
      });

      setValue("items", valsFb.items, {
        shouldValidate: true,
      });
      if (isObjOk(defVals)) {
        for (const k in defVals)
          setValue(k as Path<any>, defVals[k], {
            shouldValidate: true,
            shouldDirty: true,
          });
      }

      oldVals.current = valsFb;
      setPreSubmit({ el: "isPopulated", val: true });
      if (!schema.safeParse(defVals).success) return;

      triggerRtk({ vals: valsFb, routeID });
    }

    const storageData = JSON.parse(savedVals!);
    const { page, limit, ...dataRHF } = storageData;
    const parsed = cpyObj({
      ...dataRHF,
      items: existingItems.length
        ? existingItems
        : storageData?.items?.length
        ? storageData.items
        : fallBackItems,
    });

    reset(parsed);
    triggerRHF();

    // ? HERE AS IN OTHERS PLACES U WILL SE A DISABILITIION OF STATE THAT ALLOW API, IT IS CAUSE I ALREADY MAKE CALL RIGHT NOW SO HAS NO SENSE TO REPEAT IN DEBOUNCE

    setPagination({ el: "page", val: parsed?.page ?? 0 });

    const merged = {
      ...parsed,
      ...getDefValsPagination(parsed?.page),
    };

    oldVals.current = merged;
    setPreSubmit({ el: "isPopulated", val: true });

    if (!schema.safeParse(parsed).success) return;
    triggerRtk({ vals: merged, routeID });
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
    schema,
    triggerRHF,
    reset,
  ]);
};
