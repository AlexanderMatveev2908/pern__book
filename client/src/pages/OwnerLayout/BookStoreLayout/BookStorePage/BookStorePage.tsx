import ImagesSwapper from "@/components/elements/ImagesSwapper/ImagesSwapper";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useScroll, useWrapQueryAPI } from "@/core/hooks/hooks";
import { useGetBookStoreQuery } from "@/features/OwnerLayout/bookStoreSliceAPI";
import { useGetUserProfileQuery } from "@/features/UserLayout/userSliceAPI";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import DropActions from "./components/DropActions";
import {
  KEY_MAP_STORE,
  labelsBookStore,
  labelTeamStore,
  statsBooks,
  statsOrders,
  statsReviews,
} from "@/core/config/fieldsData/bookStore/actions";
import DropStats from "./components/DropStats";

const BookStorePage: FC = () => {
  useScroll();

  const { bookStoreID } = useParams() ?? {};
  const itPass = useMemo(() => REG_ID.test(bookStoreID ?? ""), [bookStoreID]);
  const { data: { user } = {} } = useGetUserProfileQuery() ?? {};
  const res = useGetBookStoreQuery(bookStoreID!, {
    skip: !itPass,
  });
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res ?? {};

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isVerified && itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <div className="parent__form">
        <Title {...{ title: bookStore?.name }} />

        <DropActions {...{ bookStoreID }} />

        <ImagesSwapper
          {...{
            images: bookStore?.images,
          }}
        />
        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.BOOKS),
                fields: statsBooks([0]),
              }}
            />
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
                fields: statsOrders([0]),
              }}
            />
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
                fields: statsReviews([0]),
              }}
            />
          </div>

          <DropStats
            {...{
              el: labelTeamStore,
              styleUL:
                "max-h-[500px] scrollbar__app scrollbar__y overflow-y-auto",
            }}
          >
            {(bookStore?.team ?? []).map((el, i) => (
              <li
                key={i}
                className="w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-y-1"
              >
                <div className="w-full truncate">
                  <span className="txt__2">{el.userEmail}</span>
                </div>

                <div className=" justify-self-start sm:justify-self-end pr-3">
                  <span className="txt__2 ">{el.role}</span>
                </div>
              </li>
            ))}
          </DropStats>
        </div>
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
