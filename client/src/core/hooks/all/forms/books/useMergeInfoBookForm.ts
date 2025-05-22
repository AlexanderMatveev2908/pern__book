import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { useGetU } from "../../useGetU";
import { useMemo } from "react";
import { useWrapQueryAPI } from "../../wrappers/useWrapQueryAPI";

export const useMergeInfoBookForm = () => {
  const {
    user,
    isLoading: isUserLoading,
    error: userError,
    isError: isUserError,
  } = useGetU();

  const res =
    booksSLiceAPI.endpoints.getStoresInfo.useQuery(undefined, {
      refetchOnMountOrArgChange: true,
    }) ?? {};
  const {
    data: { stores } = {},
    isLoading: isStoresLoading,
    isError: isStoresError,
    error: storesError,
  } = res;

  useWrapQueryAPI({ ...res });

  const isSomeErr = useMemo(
    () => isUserError || isStoresError,
    [isUserError, isStoresError]
  );
  const someErr = useMemo(
    () => userError || storesError,
    [userError, storesError]
  );
  const someonePending = useMemo(
    () => isUserLoading || isStoresLoading,
    [isUserLoading, isStoresLoading]
  );

  return {
    user,
    stores,
    isSomeErr,
    someErr,
    someonePending,
  };
};
