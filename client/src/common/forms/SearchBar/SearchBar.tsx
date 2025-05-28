/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import SkeletonBar from "./components/SkeletonBar";
import { useLocation, useParams } from "react-router-dom";
import { calcSearchbarID } from "@/core/lib/all/utils/ids";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";
import { usePopulateSearch } from "@/core/hooks/all/forms/searchBar/usePopulateSearch";
import { useDebounceSearch } from "@/core/hooks/all/forms/searchBar/useDebounceSearch";
import { useHandleErrSearch } from "@/core/hooks/all/forms/searchBar/useHandleErrSearch";
import { useFormContext } from "react-hook-form";
import SortDrop from "./components/SortPop/SortDrop";
import SortPop from "./components/SortPop/SortPop";
import ButtonsForm from "./components/Buttons/ButtonsForm";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { cpyObj, getDefValsPagination, isStr } from "@/core/lib/lib";
import { REG_ID } from "@/core/config/regex";
import { ZodEffects, ZodObject } from "zod";

// ? I LIKE THINKING OF WHAT I HAVE IN MIND LIKE A METAPHORIC INNER JOIN BUT ON FRONTEND CATEGORIES ITEMS AS STRINGS, IF U CHOSE THE MAIN CATEGORY AUTOMATICALLY WILL SEE THE SUB CATEGORIES

type PropsType = {
  hook: any;
  handleSave: () => void;
  txtInputs?: FormFieldBasic[];
  filters?: FilterSearch[];
  sorters?: SorterSearch[];
  numericFilters?: NumericFilterSearch[];
  innerJoinCat?: boolean;
  paramID?: string;
  defVals?: any;
  schema: ZodEffects<ZodObject<any, any, any>>;
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  sorters,
  numericFilters,
  hook,
  innerJoinCat,
  paramID,
  defVals = {},
  schema,
}) => {
  const [triggerRtk, res] = hook;

  const routeID = useParams()?.[paramID ?? ""];

  useWrapQueryAPI({ ...res });

  const { isFetching } = res;
  const ctx = useSearchCtx();
  const {
    isPending,
    setIsPending,
    preSubmit: { isPopulated, canMakeAPI },
  } = ctx;

  const formCtx = useFormContext();
  const { watch, getValues } = formCtx;

  // useFocus({ key: `items.${0}`, setFocus, delay: 1000 });

  const { isLoading, isFetching: isReloading, data, isError } = res;
  useEffect(() => {
    if (isStr(routeID) && !REG_ID.test(routeID ?? "")) return;

    // ? RTK AND RHF ARE LIKE TWO FRIENDS THAT U HELPED TO MEET AND THEY THEN PUT TOGETHER TO EXCLUDE YOU, MY TRIGGER_RTK JUST SEND DATA TO SERVER BUT IS SAME WAY CAUSE I CALL SCHEMA_SAFE_PARSE OR CAUSE THEY ARE CONNECTED BY REF IN MEMORY, AFTER I CHANGE VAL OF FIELD ITEM AFTER REFRESH I GET ERROR CAUSE I AM TRYING TO CHANGE PROPERTY OF OBJECT_FROZEN WHICH I AM NOT ACTUALLY DOING, ANYWAY BETTER THING IS TO USE CUSTOM _FN / LIBRARY / STRUCTURED_CLONE OR PARSE_STRINGIFY TO WORK WITH NEW REFS EVEN OUTSIDE OF RHF CONTEXT

    const valsRHF = cpyObj({
      ...getValues(),
    });

    if (
      [isLoading, isReloading, isError, Object.keys(data ?? {}).length].every(
        (val) => !val
      ) &&
      isPopulated &&
      schema.safeParse(valsRHF).success &&
      canMakeAPI
    )
      triggerRtk({
        vals: { ...valsRHF, ...getDefValsPagination() },
        routeID,
      });
  }, [
    isLoading,
    isReloading,
    data,
    isError,
    getValues,
    triggerRtk,
    isPopulated,
    routeID,
    defVals,
    canMakeAPI,
    schema,
  ]);

  const realTimeVals = watch();

  // * POPULATE FORM EXISTING VALS
  usePopulateSearch({
    ctx,
    triggerRtk,
    filters,
    txtInputs,
    routeID,
    defVals,
    schema,
  });

  // * DEBOUNCE SUBMIT OF VALS TO SERVER OF 500 ms
  useDebounceSearch({
    ctx,
    getValues: formCtx.getValues,
    realTimeVals,
    txtInputs,
    triggerRtk,
    routeID,
  });

  // * SYNC LOADING SUBMIT AND CLEAR BTN
  useSyncLoading({
    isFetching,
    isPendingCustom: isPending.submit,
    setIsPending: (val: boolean) => setIsPending({ el: "submit", val }),
  });
  useSyncLoading({
    isFetching,
    isPendingCustom: isPending.clear,
    setIsPending: (val: boolean) => setIsPending({ el: "clear", val }),
  });

  // * MANAGEMENT ERRORS SEARCH BAR
  useHandleErrSearch({ ctx, formCtx, realTimeVals, numericFilters });

  const path = useLocation().pathname;
  const searchBarID = useMemo(() => calcSearchbarID(path), [path]);

  return !isPopulated ? (
    <SkeletonBar />
  ) : (
    <form
      id={searchBarID}
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 gap-5 search_bar"
    >
      <div className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4">
        <BgBlack {...{ bars: ctx.bars }} />
        <FilterBar
          {...{
            hook,
            filters,
            innerJoinCat,
            numericFilters,
            txtInputs,
            routeID,
            defVals,
          }}
        />
        <SortPop {...{ sorters }} />

        <TxtInputs {...{ triggerRtk, txtInputs, routeID }}>
          <ButtonsForm
            {...{
              txtInputs,
              isFetching,
              numericFilters,
              res,
              triggerRtk,
              routeID,
              defVals,
              innerJoinCat,
            }}
          />
        </TxtInputs>
      </div>

      <SortDrop {...{ res, setBar: ctx.setBar }} />
    </form>
  );
};

export default SearchBar;
