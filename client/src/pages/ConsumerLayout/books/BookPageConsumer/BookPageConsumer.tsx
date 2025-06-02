import BreadCrumb from "@/components/elements/BreadCrumb";
import InfoBookAbout from "@/components/elements/cards/books/subComponents/InfoBookAbout";
import RatingFancy from "@/components/elements/cards/shared/rating/RatingFancy";
import DropStats from "@/components/elements/dropMenus/dropSimple/DropStats";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import {
  labelDescriptionBook,
  showGeneralStatsBook,
} from "@/core/config/fieldsData/books/cards";
import {
  labelDelivery,
  labelFieldAddressStore,
} from "@/core/config/fieldsData/bookStores/cards";
import {
  labelCategories,
  labelInfo,
  libraryLabelStoreDynamic,
} from "@/core/config/fieldsData/labels/shared";
import { REG_ID } from "@/core/config/regex";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/books/consumerBooksSliceAPI";
import {
  showStoreAddressFromBook,
  statsDeliveryStoreFromBook,
} from "@/features/ConsumerLayout/books/fields/card";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const BookPageConsumer: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");

  const res = consumerBooksSliceAPI.endpoints.getBookConsumer.useQuery(
    bookID!,
    {
      skip: !isValidID,
    }
  );
  useWrapQueryAPI({ ...res });
  const { data: { book } = {} } = res ?? {};

  const ids = useCreateIds({
    lengths: [book?.store?.categories?.length],
  });

  return (
    <WrapPageAPI
      {...{
        ...res,
        canStay: isValidID,
      }}
    >
      <BreadCrumb
        {...{
          els: [
            { label: "search", path: "#" },
            { label: "books", path: "/consumer/books" },
            { label: book?.title ?? "book", path: "#" },
          ],
        }}
      />

      {isObjOk(book) && (
        <div className="p_form__1 ">
          <Title {...{ title: book?.title }} />

          <div className="w-full grid grid-cols-1 gap-10">
            <ImagesScroll {...{ images: book!.images }} />

            <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              <InfoBookAbout {...{ el: book!, listen: true }} />

              <DropStats
                {...{
                  el: labelInfo,
                  fields: showGeneralStatsBook(book!),
                  listen: true,
                }}
              />

              <RatingFancy {...{ el: book!, listen: true }} />

              <DropStats
                {...{
                  el: libraryLabelStoreDynamic(book?.store?.name ?? ""),
                  ovHidden: false,
                  listen: true,
                }}
              >
                <DropStats
                  {...{
                    el: labelFieldAddressStore,
                    abs: true,
                    fields: showStoreAddressFromBook(book!),
                  }}
                />

                <DropStats
                  {...{
                    el: labelCategories,
                    abs: true,
                  }}
                >
                  {book?.store?.categories?.map((el, i) => (
                    <li
                      key={ids?.[0]?.[i] ?? i}
                      className="w-full flex justify-start"
                    >
                      <span className="txt__2">{el}</span>
                    </li>
                  ))}
                </DropStats>

                <DropStats
                  {...{
                    el: labelDelivery,
                    abs: true,
                    fields: statsDeliveryStoreFromBook(book!),
                  }}
                />
              </DropStats>

              <DropStats
                {...{
                  el: labelDescriptionBook,
                  fields: null,
                  styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
                  ovHidden: true,
                  listen: true,
                }}
              >
                <li className="w-full flex justify-start pr-5">
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

export default BookPageConsumer;
