import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/useGetU";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import DropActionsBook from "./components/DropActionsBook";
import ImagesScroll from "@/components/elements/cards/shared/ImagesScroll";
import { useMixVars } from "@/core/hooks/all/useMixVars";
import DropStats from "@/components/elements/cards/shared/DropStats";
import {
  fieldsStatsRatingBook,
  labelBookInfo,
  labelBookRating,
  labelCategoriesBook,
  labelDataBook,
  labelDescriptionBook,
  labelStoreBook,
  showGeneralStatsBook,
  statsBookInfo,
} from "@/core/config/fieldsData/OwnerLayout/books/read";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import DropStatsStatic from "@/components/elements/cards/shared/DropStatsStatic";
import { FaDatabase } from "react-icons/fa";

const BookPage: FC = () => {
  useScroll();
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

  const ids = useCreateIds({
    lengths: [book?.categories?.length, book?.store?.categories?.length],
  });

  return (
    <WrapPageAPI
      {...{ canStay: user?.hasBooks && itPass, isError, error, isLoading }}
    >
      {!book ? null : (
        <div className="parent__form ">
          <Title {...{ title: book?.title }} />

          <DropActionsBook {...{ book }} />

          <ImagesScroll {...{ images: book.images }} />

          <div className="w-full grid grid-cols-1 gap-x-10 gap-y-3">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
              <DropStats
                {...{ el: labelBookInfo, fields: statsBookInfo(book) }}
              />
              <DropStats {...{ el: labelCategoriesBook, fields: null }}>
                {book.categories?.map((el, i) => (
                  <li key={ids![0][i]} className="w-full flex justify-start">
                    <span className="txt__2">{el}</span>
                  </li>
                ))}
              </DropStats>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
              <DropStats
                {...{
                  el: labelDataBook,
                  fields: showGeneralStatsBook(book),
                }}
              />

              <DropStats
                {...{
                  el: labelBookRating,
                  fields: fieldsStatsRatingBook(book),
                }}
              />
            </div>

            <div className="w-full grid grid-cols-1 gap-10 sm:grid-cols-2 ">
              <DropStats {...{ el: labelStoreBook(book?.store?.name ?? "") }}>
                <li className="w-full grid grid-cols-[150px_1fr] items-center mb-4">
                  <div className="w-full flex justify-start items-center gap-5">
                    <FaDatabase className="icon__md" />
                    <span className="txt__3">Store ID</span>
                  </div>

                  <div className="w-full h-full flex max-w-full scrollbar__app scrollbar__x overflow-x-auto">
                    <span className="txt__3 text-nowrap">
                      {book?.bookStoreID}
                    </span>
                  </div>
                </li>

                <DropStatsStatic {...{ el: labelCategoriesBook }}>
                  {book?.store?.categories?.map((el, i) => (
                    <li key={ids![1][i]} className="w-full flex justify-start">
                      <span className="txt__2">{el}</span>
                    </li>
                  ))}
                </DropStatsStatic>
              </DropStats>

              <DropStats
                {...{
                  el: labelDescriptionBook,
                  fields: null,
                  styleUL:
                    "max-h-[500px] scrollbar__app scrollbar__y overflow-y-auto",
                }}
              >
                <li className="w-full flex justify-start">
                  <span className="txt__2">{book?.description ?? "N/A"}</span>
                </li>
              </DropStats>
            </div>
          </div>
        </div>
      )}
    </WrapPageAPI>
  );
};

export default BookPage;
