/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { decapt, isObjOk } from "@/core/lib/lib";
import { bookStoresWorkerSliceAPI } from "@/features/WorkerLayout/BookStores/bookStoresWorkerSliceAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import ActionsWorker from "./components/ActionsWorker";
import ImagesScroll from "@/components/elements/cards/shared/ImagesScroll";
import InfoStoreAllUsers from "@/components/elements/cards/bookstore/page/InfoStoreAllUsers";
import InfoBookStoreWorker from "@/components/elements/cards/shared/HOC/InfoBookStoreWorker";
import { UserRole } from "@/types/types";
import BreadCrumb from "@/components/elements/BreadCrumb";

const BookStorePageWorker: FC = () => {
  const bookStoreID = useParams()?.bookStoreID;
  const itPass = REG_ID.test(bookStoreID ?? "");
  const res = bookStoresWorkerSliceAPI.useGetSingleStoreWorkerQuery(
    { bookStoreID: bookStoreID! },
    {
      skip: !itPass,
    }
  );
  useWrapQueryAPI({ ...res });
  const { data: { bookStore } = {} } = res;
  const [{ bookStoreUser: { role } = {} } = {}] =
    bookStore?.team ?? ([] as any);

  return (
    <WrapPageAPI
      {...{
        canStay: itPass,
        isLoading: res?.isLoading,
        error: res?.error,
        isError: res?.isError,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            {
              label: decapt(
                ((bookStore?.team as any)?.[0]?.bookStoreUser?.role as any) ??
                  "worker"
              ),
              path: "#",
            },
            {
              label: "book stores",
              path: "/worker/book-stores/list",
            },
            {
              label: bookStore?.name ?? "Book store",
              path: "#",
            },
          ],
        }}
      />

      <div
        className={`p_form__1 ${
          isObjOk(bookStore?.video) ? "mb-[-150px]" : ""
        }`}
      >
        <Title {...{ title: bookStore?.name }} />

        <ActionsWorker {...{ bookStore }} />

        <ImagesScroll
          {...{
            images: bookStore?.images,
          }}
        />

        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-3">
          <InfoStoreAllUsers {...{ bookStore }} />

          {role === UserRole.MANAGER && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
              <InfoBookStoreWorker {...{ bookStore }} />
            </div>
          )}
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

export default BookStorePageWorker;
