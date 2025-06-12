/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
  TriggerRTK,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import SkeletonBar from "./components/SkeletonBar/SkeletonBar";
import { useLocation, useParams } from "react-router-dom";
import { calcSearchbarID } from "@/core/lib/all/utils/ids";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useSyncLoading } from "@/features/common/SearchBar/hooks/useSyncLoading";
import { usePopulateSearch } from "@/features/common/SearchBar/hooks/usePopulateSearch";
import { useDebounceSearch } from "@/features/common/SearchBar/hooks/useDebounceSearch";
import { useHandleErrSearch } from "@/features/common/SearchBar/hooks/useHandleErrSearch";
import { useFormContext } from "react-hook-form";
import SortDrop from "./components/SortDrop";
import SortPop from "./components/SortPop/SortPop";
import ButtonsForm from "./components/ButtonsForm/ButtonsForm";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { __cg, cpyObj, getDefValsPagination, isStr } from "@/core/lib/lib";
import { REG_ID } from "@/core/config/regex";
import { ZodEffects, ZodObject } from "zod";

// ? I LIKE THINKING OF WHAT I HAVE IN MIND LIKE A METAPHORIC INNER JOIN BUT ON FRONTEND CATEGORIES ITEMS AS STRINGS, IF U CHOSE THE MAIN CATEGORY AUTOMATICALLY WILL SEE THE SUB CATEGORIES

// ? THE SEARCH BAR IS IN SOME WAY THE HEART OF APP AND I TRIED TO KEEP IT AS ORGANIZED AS POSSIBLE, SOME THINGS COULD BE BETTER DIVIDED FOLLOWING A MORE SPECIFIC MINDSET BUT WHERE POSSIBLE I PREFER ADD PROPS TO MY COMPONENTS INSTEAD OF COPY PASTING EXISTENT CODE INTO A NEW COMPONENT WITH JUST FEW CHANGES
type PropsType = {
  hook?: TriggerRTK;
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
  const [triggerRtk, res] = hook ?? ([() => null, {}] as any);
  const { isFetching } = res ?? {};

  const formCtx = useFormContext();
  const { watch, getValues, setFocus, handleSubmit } = formCtx;
  const ctx = useSearchCtx();
  const {
    updateValsNoDebounce,
    setIsPending,
    isPending,

    preSubmit: { isPopulated, canMakeAPI },
  } = ctx;

  const routeID = useParams()?.[paramID ?? ""];

  const handleSave = handleSubmit(
    (formData) => {
      setIsPending({ el: "submit", val: true });

      console.log(formData);
      const data = {
        ...formData,
        ...getDefValsPagination(0),
      };

      updateValsNoDebounce({ vals: data, triggerRtk, routeID });
    },
    (errs) => {
      __cg("err search", errs);
      return errs;
    }
  );

  useWrapQueryAPI({ ...res } as any);

  useFocus({ key: `items.${0}.val`, setFocus, delay: 500 });

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
      className="w-full grid grid-cols-1 gap-5"
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
        <SortPop {...{ sorters, triggerRtk, routeID }} />

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
