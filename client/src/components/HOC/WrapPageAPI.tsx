/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ErrIcon, SpinnerPage } from "../components";
import { getMsgErr } from "@/lib/lib";

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
  const { response: { data, status } = {} } = error ?? {};

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
      <div className="grid justify-items-center items-start gap-[50px] txt__col">
        <div className="h-fit flex flex-col items-center">
          <span className="text-6xl font-extrabold text-red-600 mb-[12.5px]">
            {status}
          </span>
          <span className="txt__4 leading-[35px] tracking-wider">
            {getMsgErr(data)}
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
