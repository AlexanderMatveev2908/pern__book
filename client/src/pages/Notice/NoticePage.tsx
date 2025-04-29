import { getNoticeState } from "@/features/Notice/noticeSlice";
import { useScroll } from "@/core/hooks/hooks";
import { canStayNotice } from "@/core/lib/lib";
import { EventApp } from "@/types/types";
import { FC, useEffect, useRef } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ErrIcon from "@/components/elements/ErrIcon";

const Notice: FC = () => {
  useScroll();

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
    <Navigate to="/" replace={true} />
  ) : (
    <div className="parent__page">
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
            <LuCircleCheckBig className="icon__notice_lg text-green-600" />
          </div>
        ) : (
          <ErrIcon {...{ classCSS: "icon__notice_lg" }} />
        )}
      </div>
    </div>
  );
};
export default Notice;
