import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import DropActionsOwner from "./components/DropActionsOwner";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import InfoStoreMapProp from "@/components/elements/cards/bookstore/InfoStoreMapProp";
import { isObjOk } from "@/core/lib/lib";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import { useGetBookStoreQuery } from "@/features/OwnerLayout/bookStores/bookStoreSliceAPI";
import { useClearCacheItem } from "@/core/hooks/all/api/useClearCacheItem";
import { booksSLiceAPI } from "@/features/OwnerLayout/books/booksSliceAPI";
import { TagsAPI } from "@/types/types";
import BreadCrumb from "@/components/elements/BreadCrumb";
import {
  fieldsWorkFlowStore,
  labelTeamStore,
  statsTeam,
} from "@/core/config/fieldsData/bookStores/cards";
import { workFlowLabel } from "@/core/config/fieldsData/labels";
import InfoStoreAllUsersPage from "@/components/elements/cards/bookstore/InfoStoreAllUsersPage";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";

const BookStorePage: FC = () => {
  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const { user } = useGetU();
  const res = useGetBookStoreQuery(bookStoreID!, {
    skip: !itPass,
  });
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res ?? {};

  const ids = useCreateIds({
    lengths: [bookStore?.team?.length],
  });

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
          <InfoStoreAllUsersPage {...{ bookStore }} />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            <InfoStoreMapProp {...{ bookStore }} />
          </div>

          <DropStats
            {...{
              el: labelTeamStore,
              styleUL: "max-h-[500px] scroll_app scroll_y overflow-y-auto",
              fields: statsTeam(bookStore),
            }}
          >
            {!!bookStore?.team?.length && (
              <hr className="w-full border-0 bg-blue-600 h-[2px] mt-2" />
            )}

            {(bookStore?.team ?? []).map((el, i) => (
              <li
                key={ids?.[0]?.[i] ?? i}
                className="w-full grid grid-cols-1 sm:flex justify-between items-center gap-y-1"
              >
                <div className="w-full">
                  <span
                    className="txt__2 max-w-full clamp_txt"
                    style={{
                      lineClamp: 3,
                      WebkitLineClamp: 3,
                    }}
                  >
                    {el.userEmail}
                  </span>
                </div>

                <div className="justify-self-start sm:justify-self-end pr-3">
                  <span className="txt__2 ">{el.role}</span>
                </div>
              </li>
            ))}
          </DropStats>

          <DropStats
            {...{
              el: workFlowLabel,
              fields: fieldsWorkFlowStore(bookStore),
            }}
          />
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

export default BookStorePage;

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
