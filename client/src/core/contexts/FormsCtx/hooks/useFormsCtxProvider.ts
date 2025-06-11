import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaBookForm } from "@/core/lib/all/forms/schemaZ/books";
import { searchBarStore } from "@/features/common/SearchBar/schemasZ/owner/store";
import { schemaSearchBooks } from "@/features/common/SearchBar/schemasZ/owner/books";
import { schemaConsumerBooks } from "@/features/common/SearchBar/schemasZ/consumer/books";
import { schemaWorkerStores } from "@/features/common/SearchBar/schemasZ/worker/stores";
import { searchBooksWorkerSchema } from "@/features/common/SearchBar/schemasZ/worker/books";
import { schemaOwnerOrders } from "@/features/common/SearchBar/schemasZ/owner/orders";

export type SearchStoreFormType = z.infer<typeof searchBarStore>;
export type BookFormType = z.infer<typeof schemaBookForm>;
export type SearchBooksOwnerType = z.infer<typeof schemaSearchBooks>;
export type SearchBookStoreWorkerFormType = z.infer<typeof schemaWorkerStores>;
export type SearchBooksWorkerType = z.infer<typeof searchBooksWorkerSchema>;
export type SearchBooksConsumerType = z.infer<typeof schemaConsumerBooks>;
export type SearchOrdersOrdersType = z.infer<typeof schemaOwnerOrders>;

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

  const formSearchBooksConsumerCtx = useForm<SearchBooksConsumerType>({
    resolver: zodResolver(schemaConsumerBooks),
    mode: "onChange",
  });

  const formSearchOrdersOwnerCtx = useForm<SearchOrdersOrdersType>({
    mode: "onChange",
    resolver: zodResolver(schemaOwnerOrders),
  });

  return {
    formOwnerStoresCtx,
    createBookFormCtx,
    formOwnerBooksCtx,
    formWorkerBookStores,
    createBookFormWorkerCtx,
    formSearchBooksWorkerCtx,
    formSearchBooksConsumerCtx,
    formSearchOrdersOwnerCtx,
  };
};
