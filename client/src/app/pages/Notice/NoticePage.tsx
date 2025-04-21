import Notice from "@/features/common/Notice/Notice";
import { useScroll } from "@/hooks/hooks";
import { canStayNotice } from "@/lib/lib";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

const NoticePage: FC = () => {
  useScroll();

  const from = useLocation().state?.from;

  return !canStayNotice(from) ? (
    <Navigate to="/" replace={true} />
  ) : (
    <div className="parent__page">
      <Notice />
    </div>
  );
};
export default NoticePage;
