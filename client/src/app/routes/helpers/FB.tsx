import { Navigate } from "react-router-dom";

export const FB_404 = ({ path }: { path?: string } = {}) => ({
  path: "*",
  element: <Navigate to={path ?? "/"} replace />,
});
