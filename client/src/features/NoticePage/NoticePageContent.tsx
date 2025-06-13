import { useEffect, useRef, type FC } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getNoticeState } from "./noticeSlice";
import { canStayNotice } from "@/core/lib/lib";
import Push from "@/app/routes/helpers/Push";
import { EventApp } from "@/types/types";
import { LuCircleCheckBig } from "react-icons/lu";
import ErrIcon from "@/components/elements/ErrIcon";

const NoticePageContent: FC = () => {
  const from = useLocation().state?.from;

  const runRef = useRef<boolean>(false);
  const noticeState = useSelector(getNoticeState);

  useEffect(() => {
    if (typeof noticeState.cb === "function" && !runRef.current) {
      runRef.current = true;
      noticeState.cb();
    }
    // if (typeof noticeState.cb === "function" && noticeState.cb.run) {
    //   noticeState.cb();
    // }
  }, [noticeState]);

  return !canStayNotice(from) ? (
    <Push />
  ) : (
    <div className="p_page">
      <div className="w-full grid justify-items-center">
        <span
          className={`text-6xl font-extrabold ${
            noticeState.type === EventApp.OK ? "text-green-600" : "text-red-600"
          }`}
        >
          {noticeState.status}
        </span>
        <span className="txt__5 txt__col mt-[25px] mb-[50px]">
          {noticeState.notice}
        </span>

        {noticeState.type === EventApp.OK ? (
          <div className="w-fit">
            <LuCircleCheckBig className="icon_notice__lg text-green-600" />
          </div>
        ) : (
          <ErrIcon {...{ classCSS: "icon_notice__lg" }} />
        )}
      </div>
    </div>
  );
};

export default NoticePageContent;
