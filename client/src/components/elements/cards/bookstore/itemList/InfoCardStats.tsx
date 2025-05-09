import DropHandler from "@/components/elements/DropHandler/DropHandler";
import { statsCardStore } from "@/core/config/fieldsData/bookStore/card";
import { BookStoreType } from "@/types/all/bookStore";
import { FC, useState } from "react";
import InfoBookStoreWorker from "../page/InfoBookStoreWorker";

type PropsType = {
  el: BookStoreType;
};

const InfoCardStats: FC<PropsType> = ({ el }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <DropHandler {...{ isDropOpen, setIsDropOpen, el: statsCardStore }} />
      <hr className="bg-blue-600 border-0 h-[3px] w-full -mt-2" />

      <div
        className={`transition-all duration-[0.4s] ${
          isDropOpen
            ? "opacity-100 max-h-[500px]"
            : "opacity-0 pointer-events-none max-h-0 -z-50"
        }`}
      >
        <InfoBookStoreWorker {...{ abs: true, bookStore: el }} />
      </div>
    </div>
  );
};

export default InfoCardStats;
