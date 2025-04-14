import { FC, useEffect } from "react";
import { LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";
import "./Notice.css";
import { useSelector } from "react-redux";
import { getNoticeState } from "./noticeSlice";
import { EventApp } from "@/types/types";

const Notice: FC = () => {
  const noticeState = useSelector(getNoticeState);

  useEffect(() => {
    if (typeof noticeState.cb === "function" && noticeState.cb.run) {
      noticeState.cb();
    }
  }, [noticeState]);

  return (
    <div className="w-full grid justify-items-center gap-y-[100px]">
      <span className="txt__5 txt__col">{noticeState.notice}</span>

      {noticeState.type === EventApp.OK ? (
        <div className="w-fit">
          <LuCircleCheckBig className="icon__notice text-green-600" />
        </div>
      ) : (
        <div className="w-fit">
          <LuCircleAlert className="icon__notice text-red-600" />
        </div>
      )}
    </div>
  );
};
export default Notice;
