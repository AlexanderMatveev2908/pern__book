import BreadCrumb from "@/components/elements/BreadCrumb";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/books/consumerBooksSliceAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import ReadContent from "./components/ReadContent";
import ButtonsCart from "./components/ButtonsCart";
import { useGetU } from "@/core/hooks/all/api/useGetU";
import PlaceholderLogic from "./components/PlaceholderLogic";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";

const BookPageConsumer: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");
  const { user, isLoading } = useGetU();

  const res = consumerBooksSliceAPI.endpoints.getBookConsumer.useQuery(
    bookID!,
    {
      skip: !isValidID,
    }
  );
  useWrapQueryAPI({ ...res });
  const { data: { book } = {} } = res ?? {};

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

            {isLoading ? (
              <div className="w-full flex justify-center">
                <SpinnerBtn />
              </div>
            ) : user?.isVerified ? (
              <ButtonsCart {...{ book: book! }} />
            ) : (
              <PlaceholderLogic />
            )}

            <ReadContent {...{ book: book! }} />
          </div>
        </div>
      )}
    </WrapPageAPI>
  );
};

export default BookPageConsumer;
