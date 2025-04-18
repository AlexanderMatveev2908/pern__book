/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ErrIcon, SpinnerPage } from "../components";

type PropsType = {
  canStay?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  push?: boolean;
  error?: any;
  children?: ReactNode | null;
};

const WrapPageAPI: FC<PropsType> = ({
  canStay = true,
  isLoading = false,
  isError = false,
  push = false,
  error = null,
  children = null,
}) => {
  return !canStay ? (
    <Navigate to="/" replace={true} />
  ) : isLoading ? (
    <div className="min-h-[100vh] relative -mt-[50px]">
      <SpinnerPage />
    </div>
  ) : isError ? (
    push ? (
      <Navigate to="/" replace={true} />
    ) : (
      <div className="grid justify-items-center items-start gap-[25px]">
        <div className="h-fit">
          <span className="txt__4 txt__col leading-[35px] tracking-wider">
            {error}
          </span>
        </div>
        <ErrIcon {...{ classCSS: "icon__notice_md" }} />
      </div>
    )
  ) : (
    children
  );
};
export default WrapPageAPI;
