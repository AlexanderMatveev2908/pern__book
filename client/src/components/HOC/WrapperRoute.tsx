import type { FC, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";

type PropsType = {
  path: string;
  layout: ReactNode;
  children: ReactNode[];
};

const WrapperRoute: FC<PropsType> = ({ path, layout, children }) => (
  <Route path={path} element={layout}>
    {children}
    <Route path="*" element={<Navigate to="/" replace={true} />} />
  </Route>
);

export default WrapperRoute;
