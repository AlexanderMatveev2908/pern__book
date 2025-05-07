import { useForm } from "react-hook-form";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getStorage } from "@/core/lib/lib";
import { StorageKeys } from "@/types/types";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;

export const useFormsCtxProvider = () => {
  const savedOwnerStores = getStorage(StorageKeys.STORES_OWNER);
  const formOwnerStoresCtx = useForm<SearchStoreFormType>({
    resolver: zodResolver(searchBarStore),
    mode: "onChange",
    defaultValues: savedOwnerStores ? JSON.parse(savedOwnerStores) : {},
  });

  return {
    formOwnerStoresCtx,
  };
};
