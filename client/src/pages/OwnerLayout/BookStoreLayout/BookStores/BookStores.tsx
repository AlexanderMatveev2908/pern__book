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
import { useDebounce } from "@/core/hooks/all/useDebounce";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { getStorage } from "@/core/lib/lib";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { StorageKeys } from "@/types/types";
import { FC, useEffect } from "react";
import { FormProvider } from "react-hook-form";

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const { args, setArgs, setIsPending } = useSearchCtx();
  const { handleSubmit, setFocus, setValue, getValues, watch } = formCtx;
  useDebounce({
    getValues,
    watch,
    keyStorage: StorageKeys.STORES_OWNER,
    setArgs,
  });

  useEffect(() => {
    const savedData = getStorage(StorageKeys.STORES_OWNER);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      for (const key in parsed) {
        setValue(key as keyof SearchStoreFormType, parsed[key]);
      }
    }
  }, [setValue]);

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(
    args as SearchStoreFormType,
    {
      skip: false,
    }
  );
  useWrapQueryAPI({ ...res });
  useFocus({ key: "name", setFocus });

  const handleSave = handleSubmit(() => {
    setIsPending({ el: "submit", val: true });
    setArgs({ ...getValues(), _: Date.now() });
  });

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
              keyStorageVals: StorageKeys.STORES_OWNER,
              keyStorageLabels: StorageKeys.SEARCH_BAR_STORES_OWNER,
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
