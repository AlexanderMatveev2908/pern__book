import { FC, useMemo } from "react";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  StorageKeys,
} from "@/types/types";
import TxtInputs from "./components/TxtInputs/TxtInputs";
import BgBlack from "./components/BgBlack";
import FilterBar from "./components/FilterBar/FilterBar";
import ButtonsForm from "./components/ButtonsForm";
import "./SearchBar.css";
import SkeletonBar from "./components/SkeletonBar";
import { useSearchBar } from "./useSearchBar";
import { useLocation } from "react-router-dom";
import { getSearchBarID } from "@/core/lib/all/utils/ids";
import { getKeysSearchBar } from "@/core/lib/lib";

type PropsType = {
  isLoading: boolean;
  isFetching: boolean;
  handleSave: () => void;
  txtInputs: FormFieldBasic[];
  keyStorageVals: StorageKeys;
  keyStorageLabels: StorageKeys;
  filters: FilterSearch[];
  numericFilters?: NumericFilterSearch[];
};

const SearchBar: FC<PropsType> = ({
  handleSave,
  txtInputs,
  filters,
  numericFilters,
  keyStorageVals,
  keyStorageLabels,
  isFetching,
  isLoading,
}) => {
  useSearchBar({
    txtInputs,
    filters,
    numericFilters,
    keyStorageVals,
    keyStorageLabels,
    isFetching,
  });

  const path = useLocation().pathname;
  const searchBarID = useMemo(() => getSearchBarID(path), [path]);

  const keys = getKeysSearchBar(path);
  console.log(keys);
  return isLoading ? (
    <SkeletonBar />
  ) : (
    <form
      id={searchBarID}
      onSubmit={handleSave}
      className="w-full grid grid-cols-1 border-[3px] border-blue-600 rounded-xl p-4"
    >
      <BgBlack />
      <FilterBar {...{ filters, numericFilters }} />

      <TxtInputs {...{ txtInputs, keyStorageLabels }}>
        <ButtonsForm
          {...{
            txtInputs,
            keyStorageVals,
            keyStorageLabels,
            isFetching,
            numericFilters,
          }}
        />
      </TxtInputs>
    </form>
  );
};

export default SearchBar;
