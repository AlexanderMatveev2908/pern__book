import BreadCrumb from "@/components/elements/BreadCrumb";
import ImagesScroll from "@/components/elements/imagesHandlers/ImagesScroll/ImagesScroll";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { isObjOk } from "@/core/lib/lib";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/BooksLayout/consumerBooksSliceAPI";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import ReadContent from "./components/ReadContent";
import { useGetCart } from "@/core/hooks/all/api/useGetCart";
import SpinnerBtn from "@/components/elements/spinners/SpinnerBtn/SpinnerBtn";
import ButtonsCart from "@/features/ConsumerLayout/CartLayout/components/ButtonsCart";

const BookPageConsumer: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");
  const { cart, isLoading } = useGetCart({ refetchOnMountOrArgChange: true });

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
            ) : (
              <ButtonsCart {...{ book: book!, cart }} />
            )}

            <ReadContent {...{ book: book! }} />
          </div>
        </div>
      )}
    </WrapPageAPI>
  );
};

export default BookPageConsumer;
