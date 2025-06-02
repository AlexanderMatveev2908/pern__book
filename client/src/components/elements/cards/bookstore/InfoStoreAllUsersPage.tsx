import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import { BookStoreType } from "@/types/all/bookStore";
import { FC } from "react";
import { labelDescription } from "@/core/config/fieldsData/bookStores/cards";
import InfoStoreObjProp from "./InfoStoreObjProp";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import { labelCategories } from "@/core/config/fieldsData/labels/shared";

type PropsType = {
  bookStore?: BookStoreType;
  listen?: boolean;
};

const InfoStoreAllUsersPage: FC<PropsType> = ({ bookStore, listen }) => {
  const ids = useCreateIds({
    lengths: [bookStore?.categories?.length],
  });

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-x-10 gap-y-3">
        <DropStats {...{ el: labelCategories, fields: null, listen }}>
          {bookStore?.categories?.map((el, i) => (
            <li key={ids?.[0]?.[i] ?? i} className="w-full flex justify-start">
              <span className="txt__2">{el}</span>
            </li>
          ))}
        </DropStats>

        <DropStats
          {...{
            el: labelDescription,
            fields: null,
            styleUL: "max-h-[200px] scroll_app scroll_y overflow-y-auto",
            listen,
          }}
        >
          <li className="w-full flex justify-start pr-5">
            <span className="txt__2">{bookStore?.description ?? "N/A"}</span>
          </li>
        </DropStats>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3">
        <InfoStoreObjProp {...{ bookStore, listen: true }} />
      </div>
    </>
  );
};

export default InfoStoreAllUsersPage;
