import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  fieldsSearchStore,
  storeFilters,
} from "@/core/config/fieldsData/SearchBar/store";
import { useFocus, useWrapQueryAPI } from "@/core/hooks/hooks";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/searchBar";
import { __cg } from "@/core/lib/lib";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type SearchStoreFormType = z.infer<typeof searchBarStore>;

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery();
  useWrapQueryAPI({ ...res });

  const formCtx = useForm<SearchStoreFormType>({
    resolver: zodResolver(searchBarStore),
    mode: "onChange",
  });

  const { handleSubmit, setFocus } = formCtx;

  const handleSave = handleSubmit((data) => {
    __cg("data", data);
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
            }}
          />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
