import { SideFieldType } from "@/core/config/fieldsData/common/Sidebar/sidebar";
import { setIsSideOpen } from "@/features/common/Header/headerSlice";
import { openToast } from "@/features/common/Toast/toastSlice";
import { EventApp } from "@/types/types";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type PropsType = {
  el: SideFieldType;
};

const FakeSideLink: FC<PropsType> = ({ el }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      openToast({
        msg: "You need to confirm account first",
        type: EventApp.INFO,
        statusCode: 403,
      })
    );
    dispatch(setIsSideOpen(false));
    nav("/user/verify-account");
  };

  return (
    <div
      onClick={handleClick}
      className="w-fit flex justify-start gap-5 group el__after_below items-center nav_link"
    >
      <el.icon className="icon__with_txt icon__md" />
      <span className="txt__2 el__flow group-hover:text-blue-600">
        {el.label}
      </span>
    </div>
  );
};

export default FakeSideLink;
