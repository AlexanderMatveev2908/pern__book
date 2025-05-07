import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useFormCtxConsumer } from "@/core/contexts/FormsCtx/hooks/useFormCtxConsumer";
import { useDebounce } from "@/core/hooks/all/useDebounce";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { StorageKeys } from "@/types/types";
import { FC } from "react";
import { FormProvider } from "react-hook-form";

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const { formOwnerStoresCtx: formCtx } = useFormCtxConsumer();
  const { handleSubmit, setFocus, watch } = formCtx;
  const vals = watch();

  const { args, setArgs } = useDebounce({
    vals,
    keyStorage: StorageKeys.STORES_OWNER,
  });

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(args, {
    skip: false,
  });
  useWrapQueryAPI({ ...res });
  useFocus({ key: "name", setFocus });

  const handleSave = handleSubmit(() => {
    setArgs({ ...vals, _: Date.now() });
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
              handleSave,
              txtInputs: fieldsSearchStore,
              filters: storeFilters,
              numericFilters: numericFiltersStore,
              keyStorage: StorageKeys.STORES_OWNER,
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
