import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/useGetU";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBook from "./components/DropActionsBook";

const BookPage: FC = () => {
  useScroll();
  const { bookID = "" } = useParams();
  const itPass = REG_ID.test(bookID);

  const { user } = useGetU();

  const res = booksSLiceAPI.endpoints.getSingleBook.useQuery(bookID, {
    skip: !itPass,
  });
  const { data: { book } = {}, isLoading, isError, error } = res;
  useWrapQueryAPI({ ...res });

  return !book ? null : (
    <WrapPageAPI
      {...{ canStay: user?.hasBooks && itPass, isError, error, isLoading }}
    >
      <div className="parent__form ">
        <Title {...{ title: book?.title }} />

        <DropActionsBook {...{ book }} />
      </div>
    </WrapPageAPI>
  );
};

export default BookPage;
