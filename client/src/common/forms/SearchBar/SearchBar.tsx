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
import "./SearchBar.css";
import SkeletonBar from "./components/SkeletonBar";
import { useLocation } from "react-router-dom";
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
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { getDefValsPagination } from "@/core/lib/lib";

// ? I LIKE THINKING OF WHAT I HAVE IN MIND LIKE A METAPHORIC INNER JOIN BUT ON FRONTEND CATEGORIES ITEMS AS STRINGS, IF U CHOSE THE MAIN CATEGORY AUTOMATICALLY WILL SEE THE SUB CATEGORIES

type PropsType = {
  hook: any;
  handleSave: () => void;
  txtInputs?: FormFieldBasic[];
  filters?: FilterSearch[];
  sorters?: SorterSearch[];
  numericFilters?: NumericFilterSearch[];
  innerJoinCat?: boolean;
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  sorters,
  numericFilters,
  hook,
  innerJoinCat,
}) => {
  const [trigger, res] = hook;

  useWrapQueryAPI({ ...res });

  const { isFetching } = res;
  const ctx = useSearchCtx();
  const {
    isPending,
    setIsPending,
    preSubmit: { isPopulated },
  } = ctx;

  const formCtx = useFormContext();
  const { watch, setFocus, getValues } = formCtx;
  useFocus({ key: txtInputs?.[0].field, setFocus });

  const { isLoading, isFetching: isReloading, data, isError } = res;
  useEffect(() => {
    if (
      [isLoading, isReloading, isError, Object.keys(data ?? {}).length].every(
        (val) => !val
      ) &&
      isPopulated
    )
      trigger({
        ...getValues(),
        ...getDefValsPagination(),
      });
  }, [isLoading, isReloading, data, isError, getValues, trigger, isPopulated]);

  const realTimeVals = watch();

  // * POPULATE FORM EXISTING VALS
  usePopulateSearch({
    ctx,
    trigger,
    setValue: formCtx.setValue,
    filters,
    txtInputs,
    getValues: formCtx.getValues,
  });

  // * DEBOUNCE SUBMIT OF VALS TO SERVER OF 500 ms
  useDebounceSearch({
    ctx,
    getValues: formCtx.getValues,
    realTimeVals,
    txtInputs,
    trigger,
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
          }}
        />
        <SortPop {...{ sorters }} />

        <TxtInputs {...{ trigger, txtInputs }}>
          <ButtonsForm
            {...{
              txtInputs,
              isFetching,
              numericFilters,
              res,
              trigger,
            }}
          />
        </TxtInputs>
      </div>

      <SortDrop {...{ res, setBar: ctx.setBar }} />
    </form>
  );
};

export default SearchBar;
