import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  numericFiltersStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useDebounce } from "@/core/hooks/all/useDebounce";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const formCtx = useForm<SearchStoreFormType>({
    resolver: zodResolver(searchBarStore),
    mode: "onChange",
  });

  const { handleSubmit, setFocus, watch } = formCtx;
  const vals = watch();

  const { args, setArgs } = useDebounce({ vals });

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery(args, {
    skip: false,
  });
  useWrapQueryAPI({ ...res });

  const handleSave = handleSubmit(() => {
    setArgs({ ...vals, _: Date.now() });
  });

  useFocus({ key: "name", setFocus });

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
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
