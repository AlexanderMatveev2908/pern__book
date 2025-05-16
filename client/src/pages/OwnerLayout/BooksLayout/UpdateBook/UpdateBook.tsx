import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useMergeInfoBookForm } from "@/core/hooks/all/forms/useMergeInfoBookForm";
import { useScroll } from "@/core/hooks/hooks";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const UpdateBook: FC = () => {
  useScroll();

  const { user, stores, isSomeErr, someErr, someonePending } =
    useMergeInfoBookForm();

  const { bookID } = useParams() ?? {};
  const isValidID = REG_ID.test(bookID ?? "");

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner && isValidID,
        isLoading: someonePending,
        isError: isSomeErr,
        error: someErr,
      }}
    ></WrapPageAPI>
  );
};

export default UpdateBook;
