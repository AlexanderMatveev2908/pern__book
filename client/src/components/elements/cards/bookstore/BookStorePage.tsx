import { BookStoreType } from "@/types/all/bookStore";
import type { FC } from "react";
import DropStats from "../../dropMenus/dropSimple/DropStats";
import {
  labelCategories,
  workFlowLabel,
} from "@/core/config/fieldsData/labels/shared";
import { useCreateIds } from "@/core/hooks/all/UI/useCreateIds";
import {
  fieldsWorkFlowStore,
  labelDescription,
  labelTeamStore,
  statsTeam,
} from "@/core/config/fieldsData/bookStores/cards";
import InfoStoreObjProp from "./subComponents/InfoStoreObjProp";
import InfoStoreMapProp from "./subComponents/InfoStoreMapProp";
import { clampBy } from "@/core/lib/lib";

type PropsType = {
  el?: BookStoreType;
  isOwner?: boolean;
};

const BookStorePage: FC<PropsType> = ({ el, isOwner }) => {
  const ids = useCreateIds({
    lengths: [el?.categories?.length],
  });

  return (
    <>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] gap-x-10 gap-y-3">
        <DropStats
          {...{ el: labelCategories, fields: null, listen: true, border: true }}
        >
          {el?.categories?.map((el, i) => (
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
            listen: true,
            ovHidden: true,
            border: true,
          }}
        >
          <li className="w-full flex justify-start pr-5">
            <span className="txt__2">{el?.description ?? "N/A"}</span>
          </li>
        </DropStats>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-3">
        <InfoStoreObjProp {...{ bookStore: el, listen: true, border: true }} />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
        <InfoStoreMapProp {...{ bookStore: el, listen: true, border: true }} />
      </div>

      {isOwner && (
        <DropStats
          {...{
            el: labelTeamStore,
            styleUL: "max-h-[500px] scroll_app scroll_y overflow-y-auto",
            fields: statsTeam(el),
            listen: true,
            border: true,
          }}
        >
          {!!el?.team?.length && (
            <hr className="w-full border-0 bg-blue-600 h-[2px] mt-2" />
          )}

          {(el?.team ?? []).map((el, i) => (
            <li
              key={ids?.[0]?.[i] ?? i}
              className="w-full grid grid-cols-1 sm:flex justify-between items-center gap-y-1"
            >
              <div className="w-full">
                <span className="txt__2 max-w-full clamp_txt" {...clampBy(3)}>
                  {el.userEmail}
                </span>
              </div>

              <div className="justify-self-start sm:justify-self-end pr-3">
                <span className="txt__2 ">{el.role}</span>
              </div>
            </li>
          ))}
        </DropStats>
      )}

      <DropStats
        {...{
          el: workFlowLabel,
          fields: fieldsWorkFlowStore(el),
          listen: true,
          border: true,
        }}
      />
    </>
  );
};

export default BookStorePage;
