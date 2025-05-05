import SearchBar from "@/common/forms/SearchBar/SearchBar";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { bookStoreSliceAPI } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { FC } from "react";

const BookStores: FC = () => {
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};

  const res = bookStoreSliceAPI.endpoints.getAllStores.useQuery();
  useWrapQueryAPI({ ...res });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner,
        isLoading: res?.isLoading,
        isError: res?.isError,
        error: res?.error,
      }}
    >
      <SearchBar />
    </WrapPageAPI>
  );
};

export default BookStores;
