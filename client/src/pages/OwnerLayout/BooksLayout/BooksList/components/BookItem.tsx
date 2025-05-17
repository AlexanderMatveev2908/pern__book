import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  book: BookType;
};

const BookItem: FC<PropsType> = ({ book }) => {
  return <div></div>;
};

export default BookItem;
