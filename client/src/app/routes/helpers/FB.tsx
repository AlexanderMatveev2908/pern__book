import { isStr } from "@/core/lib/lib";
import { Navigate } from "react-router-dom";

export const FB_404 = ({ path }: { path?: string } = {}) => ({
  ...(isStr(path) ? { path } : { index: true }),
  element: <Navigate to="/" replace />,
});
