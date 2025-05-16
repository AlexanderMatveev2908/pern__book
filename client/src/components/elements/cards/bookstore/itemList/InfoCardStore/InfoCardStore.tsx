import DropHandler from "@/components/elements/DropHandler/DropHandler";
import {
  categoriesStoreLabel,
  fieldsStatsContact,
  labelFieldAddressStore,
  labelFieldContact,
  statsAddress,
} from "@/core/config/fieldsData/OwnerLayout/bookStore/actions";
import { labelCardStore } from "@/core/config/fieldsData/OwnerLayout/bookStore/card";
import DropStats from "@/components/elements/cards/shared/DropStats";
import { BookStoreType } from "@/types/all/bookStore";
import { FC, useState } from "react";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import "./InfoCardStore.css";

type PropsType = {
  el: BookStoreType;
};

const InfoCardStore: FC<PropsType> = ({ el }) => {
  const [isDropOpen, setIsDropOpen] = useState(false);

  const ids = useCreateIds({ lengths: [el.categories.length] });

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      <div
        className="w-full grid grid-cols-1 gap-4"
        // style={
        //   {
        //     "--opacity__near": isDropOpen ? 1 : 0,
        //     "--h__near": isDropOpen ? "100%" : "0%",
        //   } as React.CSSProperties
        // }
      >
        <DropHandler
          {...{ isDropOpen, setIsDropOpen, el: labelCardStore(el.name) }}
        />
        <hr className="bg-blue-600 border-0 h-[3px] w-full -mt-2" />

        <div
          className={`transition-all duration-[0.4s] ${
            isDropOpen
              ? "opacity-100 max-h-[500px]"
              : "opacity-0 pointer-events-none max-h-0"
          }`}
        >
          <DropStats {...{ el: categoriesStoreLabel, fields: null, abs: true }}>
            {el?.categories?.map((el, i) => (
              <li
                key={ids?.[0]?.[i] ?? i}
                className="w-full flex justify-start"
              >
                <span className="txt__2">{el}</span>
              </li>
            ))}
          </DropStats>

          <DropStats
            {...{
              el: labelFieldAddressStore,
              fields: statsAddress(el),
              abs: true,
            }}
          />
          <DropStats
            {...{
              el: labelFieldContact,
              fields: fieldsStatsContact(el),
              abs: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCardStore;
