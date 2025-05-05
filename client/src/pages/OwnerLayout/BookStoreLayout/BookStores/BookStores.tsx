import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/searchBar";
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
    console.log(data);
  });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
        isLoading: res?.isLoading,
        isError: res?.isError,
        error: res?.error,
      }}
    >
      <div className="parent__page">
        <FormProvider {...formCtx}>
          <SearchBar {...{ isLoading: res?.isLoading, handleSave }} />
        </FormProvider>
      </div>
    </WrapPageAPI>
  );
};

export default BookStores;
