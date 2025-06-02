import WrapPageAPI from "@/components/HOC/WrapPageAPI";
import { REG_ID } from "@/core/config/regex";
import type { FC } from "react";
import { useParams } from "react-router-dom";

const BookPageConsumer: FC = () => {
  const bookID = useParams()?.bookID;
  const isValidID = REG_ID.test(bookID ?? "");

  return (
    <WrapPageAPI
      {...{
        canStay: isValidID,
      }}
    ></WrapPageAPI>
  );
};

export default BookPageConsumer;
