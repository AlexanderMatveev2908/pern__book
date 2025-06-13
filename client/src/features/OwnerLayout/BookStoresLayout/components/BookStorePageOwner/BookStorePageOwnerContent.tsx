import { REG_ID } from "@/core/config/regex";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useMemo, type FC } from "react";
import { useParams } from "react-router-dom";
import { useGetBookStoreQuery } from "../../bookStoreSliceAPI";
import { useClearCacheItem, useWrapQueryAPI } from "@/core/hooks/hooks";
import { booksSLiceAPI } from "@/features/OwnerLayout/BooksLayout/booksSliceAPI";
import { TagsAPI } from "@/types/types";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import BreadCrumb from "@/components/elements/BreadCrumb";
import { isObjOk } from "@/core/lib/lib";
import Title from "@/components/elements/Title";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll/ImagesScroll";
import BookStorePage from "@/components/elements/cards/bookstore/BookStorePage";
import DropActionsOwner from "./components/DropActionsOwner";

const BookStorePageOwnerContent: FC = () => {
  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const { user } = useGetU();
  const res = useGetBookStoreQuery(bookStoreID!, {
    skip: !itPass,
  });
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res ?? {};

  useClearCacheItem({
    nameQ: "getSingleBook",
    slice: booksSLiceAPI,
    tag: TagsAPI.BOOK_OWNER,
  });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner && itPass,
        ...res,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "admin", path: "#" },
            { label: "Book Stores", path: "/owner/book-store/book-stores" },
            { label: bookStore?.name ?? "book store", path: "#" },
          ],
        }}
      />

      <div
        className={`p_form__1 ${
          isObjOk(bookStore?.video) ? "mb-[-150px]" : ""
        }`}
      >
        <Title {...{ title: bookStore?.name }} />

        <DropActionsOwner {...{ bookStore, user }} />

        <ImagesScroll
          {...{
            images: bookStore?.images,
          }}
        />
        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-3">
          <BookStorePage {...{ el: bookStore, isOwner: true }} />
        </div>

        {isObjOk(bookStore?.video) && (
          <div className="w-full flex justify-center mt-[150px]">
            <video
              autoPlay
              muted
              controls
              src={bookStore?.video?.url}
              className="aspect-video w-full object-cover max-w-[800px]"
            ></video>
          </div>
        )}
      </div>
    </WrapPageAPI>
  );
};

export default BookStorePageOwnerContent;
