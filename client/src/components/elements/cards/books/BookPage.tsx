import { BookType } from "@/types/all/books";
import type { FC } from "react";
import ImagesScroll from "../../imagesHandlers/ImagesScroll/ImagesScroll";
import InfoBookAbout from "./subComponents/InfoBookAbout";
import DataBookDB from "./subComponents/DataBookDB";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import { workFlowLabel } from "@/core/config/fieldsData/labels/shared";
import {
  fieldsWorkFlowBook,
  labelDescriptionBook,
} from "@/core/config/fieldsData/books/cards";
import InfoStoreFromBook from "./subComponents/InfoStoreFromBook";

type PropsType = {
  el: BookType;
  isOwner?: boolean;
};

const BookPage: FC<PropsType> = ({ el, isOwner }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <ImagesScroll {...{ images: el.images }} />

      <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10">
          <InfoBookAbout {...{ el, listen: true, border: true }} />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
          <DataBookDB {...{ el, listen: true, border: true }} />
        </div>

        <DropStats
          {...{
            el: workFlowLabel,
            fields: fieldsWorkFlowBook(el),
            listen: true,
            border: true,
          }}
        />

        <div className="w-full grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 ">
          <InfoStoreFromBook {...{ el, listen: true, isOwner, border: true }} />

          <DropStats
            {...{
              el: labelDescriptionBook,
              fields: null,
              styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
              ovHidden: true,
              listen: true,
              border: true,
            }}
          >
            <li className="w-full flex justify-start pr-5">
              <span className="txt__2">{el?.description || "N/A"}</span>
            </li>
          </DropStats>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
