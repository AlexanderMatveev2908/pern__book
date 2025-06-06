import { BookType } from "@/types/all/books";
import type { FC } from "react";
import ItemList from "../shared/ItemList";

type PropsType = {
  el: BookType;
};

const BookItemList: FC<PropsType> = ({ el }) => {
  return (
    <ItemList {...{ el }}>
      <div className=""></div>
    </ItemList>
  );
};

export default BookItemList;
