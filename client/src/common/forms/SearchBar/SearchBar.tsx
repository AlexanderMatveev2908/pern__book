import { FC, useMemo } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import ButtonsForm from "./components/ButtonsForm";
import "./SearchBar.css";
import SkeletonBar from "./components/SkeletonBar";
import { useLocation } from "react-router-dom";
import { getSearchBarID } from "@/core/lib/all/utils/ids";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useSyncLoading } from "@/core/hooks/all/useSyncLoading";
import { usePopulateSearch } from "@/core/hooks/all/forms/searchBar/usePopulateSearch";
import { useDebounceSearch } from "@/core/hooks/all/forms/searchBar/useDebounceSearch";
import { useHandleErrSearch } from "@/core/hooks/all/forms/searchBar/useHandleErrSearch";

type PropsType = {
  isFetching: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
  filters: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  numericFilters,
  isFetching,
}) => {
  const { isPending, setIsPending } = useSearchCtx();

  // * POPULATE FORM EXISTING VALS
  usePopulateSearch({ filters, txtInputs });

  // * DEBOUNCE SUBMIT OF VALS TO SERVER OF 500 ms
  useDebounceSearch({ txtInputs });

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
  useHandleErrSearch({ numericFilters });

  const {
    preSubmit: { isPopulated },
  } = useSearchCtx();

  const path = useLocation().pathname;
  const searchBarID = useMemo(() => getSearchBarID(path), [path]);

  return !isPopulated ? (
    <SkeletonBar />
  ) : (
    <form
      id={searchBarID}
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4"
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs }}>
        <ButtonsForm
          {...{
            txtInputs,
            isFetching,
            numericFilters,
          }}
        />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
