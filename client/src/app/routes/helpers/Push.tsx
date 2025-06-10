import { FC } from "react";
import { Navigate } from "react-router-dom";

type PropsType = {
  path?: string;
};
const Push: FC<PropsType> = ({ path }) => <Navigate to={path ?? "/"} replace />;

export default Push;
