import { BookStoreType } from "@/types/all/bookStore";
import { type FC } from "react";
import SpanInfoCard from "../shared/SpanInfoCard";
import { HiLibrary } from "react-icons/hi";
import { FaCity, FaDatabase } from "react-icons/fa";
import ItemList from "../shared/ItemList";

type PropsType = {
  el: BookStoreType;
};

const StoreItemList: FC<PropsType> = ({ el }) => {
  return (
    <ItemList {...{ el }}>
      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.name,
            icon: HiLibrary,
          },
        }}
      />
      <SpanInfoCard
        {...{
          spanInfo: {
            label: el.city,
            icon: FaCity,
          },
        }}
      />

      <div className="w-full flex justify-start items-center gap-6">
        <SpanInfoCard
          {...{
            spanInfo: {
              label: "Average quantity",
              icon: FaDatabase,
            },
          }}
        />

        <span className="txt__3">{el.booksStats.avgQty}</span>
      </div>
    </ItemList>
  );
};

export default StoreItemList;
