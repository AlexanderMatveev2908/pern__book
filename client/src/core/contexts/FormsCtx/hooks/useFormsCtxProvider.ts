import { useForm } from "react-hook-form";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { defValsOwnerStores } from "@/core/config/fieldsData/SearchBar/store";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;

export const useFormsCtxProvider = () => {
  const formOwnerStoresCtx = useForm<SearchStoreFormType>({
    resolver: zodResolver(searchBarStore),
    mode: "onChange",
    defaultValues: defValsOwnerStores,
  });

  return {
    formOwnerStoresCtx,
  };
};
