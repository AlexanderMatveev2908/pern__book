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
  categoriesStoreLabel,
  fieldsStatsComtact,
  KEY_MAP_STORE,
  labelDelivery,
  labelDescription,
  labelFieldAddressStore,
  labelFieldContact,
  labelsBookStore,
  labelTeamStore,
  statsAddress,
  statsBooks,
  statsDelivery,
  statsOrders,
  statsReviews,
  statsTeam,
} from "@/core/config/fieldsData/bookStore/actions";
import DropStats from "./components/DropStats";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";

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

  const idsArr = useCreateIds({
    lengths: [bookStore?.categories?.length, bookStore?.team?.length],
  });

  return (
    <WrapPageAPI
      {...{
        canStay: user?.isOwner && itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <div className="parent__form">
        <Title {...{ title: bookStore?.name }} />

        <DropActions {...{ bookStore }} />

        <ImagesSwapper
          {...{
            images: bookStore?.images,
          }}
        />
        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-3">
          <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-x-10 gap-y-3">
            <DropStats {...{ el: categoriesStoreLabel, fields: null }}>
              {bookStore?.categories?.map((el, i) => (
                <li
                  key={idsArr?.[0]?.[i] ?? i}
                  className="w-full flex justify-start"
                >
                  <span className="txt__2">{el}</span>
                </li>
              ))}
            </DropStats>

            <DropStats
              {...{
                el: labelDescription,
                fields: null,
                styleUL:
                  "max-h-[500px] scrollbar__app scrollbar__y overflow-y-auto",
              }}
            >
              <li className="w-full flex justify-start">
                <span className="txt__2">
                  {bookStore?.description ?? "No description provided"}
                </span>
              </li>
            </DropStats>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3">
            <DropStats
              {...{
                el: labelFieldAddressStore,
                fields: statsAddress(bookStore),
              }}
            ></DropStats>
            <DropStats
              {...{
                el: labelFieldContact,
                fields: fieldsStatsComtact(bookStore),
              }}
            ></DropStats>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.BOOKS),
                fields: statsBooks([0]),
              }}
            />
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.REVIEWS),
                fields: statsReviews([0]),
              }}
            />
            <DropStats
              {...{
                el: labelDelivery,
                fields: statsDelivery(bookStore),
              }}
            />
            <DropStats
              {...{
                el: labelsBookStore.get(KEY_MAP_STORE.ORDERS),
                fields: statsOrders([0]),
              }}
            />
          </div>

          <DropStats
            {...{
              el: labelTeamStore,
              styleUL:
                "max-h-[500px] scrollbar__app scrollbar__y overflow-y-auto",
              fields: statsTeam(bookStore?.team),
            }}
          >
            {!!bookStore?.team?.length && (
              <hr className="w-full border-0 bg-blue-600 h-[2px] mt-2" />
            )}

            {(bookStore?.team ?? []).map((el, i) => (
              <li
                key={idsArr?.[1]?.[i] ?? i}
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
