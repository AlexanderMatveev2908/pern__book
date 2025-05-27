import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/useGetU";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBook from "./components/DropActionsBook";
import { useMixVars } from "@/core/hooks/all/useMixVars";
import InfoBookPage from "@/components/elements/cards/shared/HOC/InfoBookPage";
import BreadCrumb from "@/components/elements/BreadCrumb";

const BookPage: FC = () => {
  const { bookID = "" } = useParams();
  const itPass = REG_ID.test(bookID);

  const {
    user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetU();

  const res = booksSLiceAPI.endpoints.getSingleBook.useQuery(bookID, {
    skip: !itPass,
  });
  const {
    data: { book } = {},
    isLoading: isBookLoading,
    isError: isBookError,
    error: bookError,
  } = res;
  useWrapQueryAPI({ ...res });

  const isLoading = useMixVars({ varA: isUserLoading, varB: isBookLoading });
  const isError = useMixVars({ varA: isUserError, varB: isBookError });
  const error = useMixVars({ varA: userError, varB: bookError });

  return (
    <WrapPageAPI
      {...{ canStay: user?.hasBooks && itPass, isError, error, isLoading }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Books", path: "/owner/books/list" },
            { label: book?.title ?? "book", path: "#" },
          ],
        }}
      />
      {!book ? null : (
        <div className="p_form__1 ">
          <Title {...{ title: book?.title }} />

          <DropActionsBook {...{ book }} />

          <InfoBookPage {...{ book }} />
        </div>
      )}
    </WrapPageAPI>
  );
};

export default BookPage;
