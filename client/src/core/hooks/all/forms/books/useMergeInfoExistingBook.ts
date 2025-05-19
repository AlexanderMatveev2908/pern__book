import { REG_ID } from "@/core/config/regex";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { useParams } from "react-router-dom";
import { useMergeInfoBookForm } from "./useMergeInfoBookForm";
import { useMemo } from "react";
import { useWrapQueryAPI } from "../../wrappers/useWrapQueryAPI";

export const useMergeInfoExistingBook = () => {
  const { bookID } = useParams() ?? {};
  const isValidID = REG_ID.test(bookID ?? "");

  const { user, stores, isSomeErr, someErr, someonePending } =
    useMergeInfoBookForm();

  const res = booksSLiceAPI.endpoints.getSingleBook.useQuery(bookID!, {
    skip: !isValidID,
  });
  const {
    data: { book } = {},
    isLoading: bookLoading,
    isError: isBookError,
    error: bookError,
  } = res;
  useWrapQueryAPI({ ...res });

  const isPending = useMemo(
    () => someonePending || bookLoading,
    [someonePending, bookLoading]
  );
  const isErr = useMemo(
    () => isSomeErr || isBookError,
    [isSomeErr, isBookError]
  );
  const error = useMemo(() => someErr || bookError, [someErr, bookError]);

  return {
    user,
    stores,
    isValidID,
    bookID,
    isPending,
    isErr,
    error,
    book,
  };
};
