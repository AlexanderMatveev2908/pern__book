import BreadCrumb from "@/components/elements/BreadCrumb";
import Title from "@/components/elements/Title";
import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import { useWrapQueryAPI } from "@/core/hooks/hooks";
import { consumerBooksSliceAPI } from "@/features/ConsumerLayout/books/consumerBooksSliceAPI";
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

      <div className="p_form__1 ">
        <Title {...{ title: book?.title }} />
      </div>
    </WrapPageAPI>
  );
};

export default BookPageConsumer;
