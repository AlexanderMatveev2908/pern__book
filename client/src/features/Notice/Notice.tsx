import { FC, useEffect, useRef } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { useSelector } from "react-redux";
import { getNoticeState } from "./noticeSlice";
import { EventApp } from "@/types/types";
import ErrIcon from "@/components/common/ErrIcon";

const Notice: FC = () => {
  const runRef = useRef<boolean>(false);
  const noticeState = useSelector(getNoticeState);

  useEffect(() => {
    if (
      typeof noticeState.cb === "function" &&
      (noticeState.cb + "").split(" ").at(-1) !== "null" &&
      !runRef.current
    ) {
      runRef.current = true;
      noticeState.cb();
    }
    // if (typeof noticeState.cb === "function" && noticeState.cb.run) {
    //   noticeState.cb();
    // }
  }, [noticeState]);

  return (
    <div className="w-full grid justify-items-center gap-y-[100px]">
      <span className="txt__5 txt__col">{noticeState.notice}</span>

      {noticeState.type === EventApp.OK ? (
        <div className="w-fit">
          <LuCircleCheckBig className="icon__notice_lg text-green-600" />
        </div>
      ) : (
        <ErrIcon {...{ classCSS: "icon__notice_lg" }} />
      )}
    </div>
  );
};
export default Notice;
