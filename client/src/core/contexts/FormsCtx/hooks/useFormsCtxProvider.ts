import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { searchBarStore } from "@/core/lib/all/forms/schemaZ/SearchBar/owner/store";
import { schemaSearchBooks } from "@/core/lib/all/forms/schemaZ/SearchBar/owner/books";
import { schemaWorkerStores } from "@/core/lib/all/forms/schemaZ/SearchBar/worker/stores";
import { searchBooksWorkerSchema } from "@/core/lib/all/forms/schemaZ/SearchBar/worker/books";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;
export type BookFormType = z.infer<typeof schemaBookForm>;
export type SearchBooksOwnerType = z.infer<typeof schemaSearchBooks>;
export type SearchBookStoreWorkerFormType = z.infer<typeof schemaWorkerStores>;
export type SearchBooksWorkerType = z.infer<typeof searchBooksWorkerSchema>;

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

  const formWorkerBookStores = useForm<SearchBookStoreWorkerFormType>({
    resolver: zodResolver(schemaWorkerStores),
    mode: "onChange",
  });

  const createBookFormWorkerCtx = useForm<BookFormType>({
    resolver: zodResolver(schemaBookForm),
    mode: "onChange",
  });

  const formSearchBooksWorkerCtx = useForm<SearchBooksWorkerType>({
    resolver: zodResolver(schemaSearchBooks),
    mode: "onChange",
  });

  return {
    formOwnerStoresCtx,
    createBookFormCtx,
    formOwnerBooksCtx,
    formWorkerBookStores,
    createBookFormWorkerCtx,
    formSearchBooksWorkerCtx,
  };
};
