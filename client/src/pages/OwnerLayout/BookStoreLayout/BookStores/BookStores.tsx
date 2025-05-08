import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { SearchStoreFormType } from "@/core/contexts/FormsCtx/hooks/useFormsCtxProvider";
import { useSearchCtx } from "@/core/contexts/SearchCtx/hooks/useSearchCtx";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { getErrFooterBar } from "@/core/lib/all/forms/errors/searchBar";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { StorageKeys } from "@/types/types";
import { FC } from "react";
import { FormProvider } from "react-hook-form";

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const {
    args,
    setArgs,
    isPopulated,
    setIsPending,
    isBtnDisabled,
    setSearch,
    setBar,
  } = useSearchCtx();
  const { handleSubmit, setFocus, getValues } = formCtx;

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(
    args as SearchStoreFormType,
    {
      skip: isBtnDisabled,
    }
  );
  useWrapQueryAPI({ ...res });
  useFocus({ key: "name", setFocus });

  const handleSave = handleSubmit(
    () => {
      setIsPending({ el: "submit", val: true });
      setArgs({ ...getValues(), _: Date.now() });
    },
    (errs) => {
      const { currArr } =
        getErrFooterBar({
          errs,
          numericFilters: numericFiltersStore,
        }) ?? {};

      if (!currArr) return;

      setBar({ el: "filterBar", val: true });
      setSearch({ el: "currFilter", val: currArr });
    }
  );

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
      }}
    >
      <div className="parent__page">
        <FormProvider {...formCtx}>
          <SearchBar
            {...{
              isLoading: res?.isLoading,
              isFetching: res?.isFetching,
              handleSave,
              txtInputs: fieldsSearchStore,
              filters: storeFilters,
              numericFilters: numericFiltersStore,
              keyStorageVals: StorageKeys.STORES_OWNER_VALS,
              keyStorageLabels: StorageKeys.STORES_OWNER_LABELS,
            }}
          />
        </FormProvider>

        <WrapPageAPI
          {...{
            isLoading: res?.isLoading || res?.isFetching || !isPopulated,
          }}
        ></WrapPageAPI>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
