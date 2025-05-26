/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getMsgErr } from "@/core/lib/lib";
import SpinnerPage from "../elements/spinners/SpinnerPage/SpinnerPage";
import ErrIcon from "../elements/ErrIcon";

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
  const { data, status } = error ?? {};

  // const [fakePending, setFakePending] = useState(false);
  // const timerID = useRef<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   if (!fakeLoading) return;

  //   if (isLoading) {
  //     clearTimer(timerID);
  //     setFakePending(true);
  //   }

  //   timerID.current = setTimeout(() => {
  //     if (isLoading) return;

  //     setFakePending(false);
  //     clearTimer(timerID);
  //   }, 1000);
  // }, [isLoading, fakeLoading]);

  return isLoading ? (
    <div className="min-h-[100vh] relative -mt-[50px]">
      <SpinnerPage />
    </div>
  ) : !canStay ? (
    <Navigate to="/" replace={true} />
  ) : isError ? (
    push ? (
      <Navigate to="/" replace={true} />
    ) : (
      <div className="grid justify-items-center items-start gap-[50px] text-gray-300">
        <div className="h-fit flex flex-col items-center">
          <span className="text-6xl font-extrabold text-red-600 mb-[12.5px]">
            {status}
          </span>
          <span className="txt__4 leading-[35px] tracking-wider">
            {getMsgErr(data)}
          </span>
        </div>
        <ErrIcon {...{ classCSS: "icon_notice__md" }} />
      </div>
    )
  ) : (
    <div className="parent__page">{children}</div>
  );
};
export default WrapPageAPI;
