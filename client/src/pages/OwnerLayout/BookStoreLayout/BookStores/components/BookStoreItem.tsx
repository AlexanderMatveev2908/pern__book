import InfoCardStats from "@/components/elements/cards/bookstore/itemList/InfoCardStats";
import InfoCardStore from "@/components/elements/cards/bookstore/itemList/InfoCardStore/InfoCardStore";
import ImagesItem from "@/components/elements/cards/shared/ImagesItem";
import ItemID from "@/components/elements/cards/shared/ItemID";
import { linksCardStore } from "@/core/config/fieldsData/bookStore/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { Link } from "react-router-dom";

type PropsType = {
  el: BookStoreType;
};

const BookStoreItem: FC<PropsType> = ({ el }) => {
  return (
    <div className="w-full grid grid-cols-1 h-fit items-start border-[3px] gap-y-5 border-blue-600 p-3 pb-5 rounded-xl  justify-self-center">
      <ItemID {...{ ID: el.id }} />
      <div className="w-full grid grid-cols-1 gap-x-5 gap-y-5">
        <div className="w-full grid grid-cols-1 h-fit items-start">
          <ImagesItem {...{ images: el.images }} />
        </div>

        <div
          className={`w-full grid grid-cols-1 sm:h-fit sm:items-start ${
            el.images?.length ? "" : "-mt-5"
          }`}
        >
          <InfoCardStore {...{ el }} />
          <InfoCardStats {...{ el }} />
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-items-center -mt-3">
        {linksCardStore.map((lin) => (
          <Link
            key={lin.id}
            to={lin.path + el.id}
            className="px-4 py-1 flex justify-center gap-5 items-center el__flow hover:text-blue-600 el__after_below"
          >
            <lin.icon className="icon__md" />

            <span className="txt__2">{lin.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookStoreItem;
