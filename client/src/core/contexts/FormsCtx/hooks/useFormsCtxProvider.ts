import { useForm } from "react-hook-form";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/SearchBar/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { schemaSearchBooks } from "@/core/lib/all/forms/schemaZ/SearchBar/books";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;
export type BookFormType = z.infer<typeof schemaBookForm>;
export type SearchBooksOwnerType = z.infer<typeof schemaSearchBooks>;

export const useFormsCtxProvider = () => {
  const formOwnerStoresCtx = useForm<SearchStoreFormType>({
    resolver: zodResolver(searchBarStore),
    mode: "onChange",
  });

  const createBookFormCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });

  const formOwnerBooksCtx = useForm<SearchBooksOwnerType>({
    resolver: zodResolver(schemaSearchBooks),
    mode: "onChange",
  });

  return {
    formOwnerStoresCtx,
    createBookFormCtx,
    formOwnerBooksCtx,
  };
};
