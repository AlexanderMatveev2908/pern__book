import { BookType } from "@/types/all/books";
import type { FC } from "react";

type PropsType = {
  el: BookType;
};

const BtnsCartCardItem: FC<PropsType> = () => {
  return <div className="w-full grid grid-cols-4"></div>;
};

export default BtnsCartCardItem;
