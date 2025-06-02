import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import DropActionsOwner from "./components/DropActionsOwner";
import { isObjOk } from "@/core/lib/lib";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useGetBookStoreQuery } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { useClearCacheItem } from "@/core/hooks/all/api/useClearCacheItem";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { TagsAPI } from "@/types/types";
import BreadCrumb from "@/components/elements/BreadCrumb";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import BookStorePage from "@/components/elements/cards/bookstore/BookStorePage";

const BookStorePageOwner: FC = () => {
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

export default BookStorePageOwner;

/*
     <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-5">
          {[...statsStore([0], bookStore?.team, [0]).entries()].map((el, i) => {
            return (
              <DropStats
                key={ids[i]}
                {...{
                  el: labelsBookStore.get(el[0]),
                  fields: el[0] === KEY_MAP_STORE.TEAM ? null : el[1].fields,
                }}
              ></DropStats>
            );
          })}
        </div>
        */
