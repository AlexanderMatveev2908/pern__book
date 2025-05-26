import type { FC } from "react";
import ImagesScroll from "../ImagesScroll";
import DropStats from "../Drop/DropStats";
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
import { FaDatabase } from "react-icons/fa";
import DropStatsStatic from "../Drop/DropStatsStatic";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { BookType } from "@/types/all/books";

type PropsType = {
  book: BookType;
  hide?: boolean;
};

const InfoBookPage: FC<PropsType> = ({ book, hide }) => {
  const ids = useCreateIds({
    lengths: [book?.categories?.length, book?.store?.categories?.length],
  });

  return (
    <>
      <ImagesScroll {...{ images: book.images }} />

      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-3">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-10">
          <DropStats {...{ el: labelBookInfo, fields: statsBookInfo(book) }} />
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

          {!hide && (
            <DropStats
              {...{
                el: labelBookRating,
                fields: fieldsStatsRatingBook(book),
              }}
            />
          )}
        </div>

        <div className="w-full grid grid-cols-1 gap-10 sm:grid-cols-2 ">
          <DropStats {...{ el: labelStoreBook(book?.store?.name ?? "") }}>
            <li className="w-full grid grid-cols-[180px_1fr] items-center mb-4">
              <div className="w-full flex justify-start items-center gap-5">
                <FaDatabase className="icon__md" />
                <span className="txt__3">Store ID</span>
              </div>

              <div className="w-full h-full flex max-w-full scroll_app scroll_x overflow-x-auto">
                <span className="txt__3 text-nowrap">{book?.bookStoreID}</span>
              </div>
            </li>

            <DropStatsStatic {...{ el: labelCategoriesBook }}>
              {book?.store?.categories?.map((el, i) => (
                <li key={ids![1][i]} className="w-full flex justify-start">
                  <span className="txt__2 py-1">{el}</span>
                </li>
              ))}
            </DropStatsStatic>
          </DropStats>

          <DropStats
            {...{
              el: labelDescriptionBook,
              fields: null,
              styleUL: "max-h-[500px] scroll_app scroll_y overflow-y-auto",
            }}
          >
            <li className="w-full flex justify-start">
              <span className="txt__2">{book?.description ?? "N/A"}</span>
            </li>
          </DropStats>
        </div>
      </div>
    </>
  );
};

export default InfoBookPage;
