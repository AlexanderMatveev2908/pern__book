import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  book: BookType;
};

const ButtonsCart: FC<PropsType> = ({ book }) => {
  return <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5"></div>;
};

export default ButtonsCart;
