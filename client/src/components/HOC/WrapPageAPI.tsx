/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode } from "react";
import { getMsgErr } from "@/core/lib/lib";
import SpinnerPage from "../elements/spinners/SpinnerPage/SpinnerPage";
import ErrIcon from "../elements/ErrIcon";
import Push from "@/app/routes/helpers/Push";

type PropsType = {
  canStay?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  push?: boolean;
  error?: any;
  children?: ReactNode | null;
  isSuccess?: boolean;
};

const WrapPageAPI: FC<PropsType> = ({
  canStay = true,
  push = false,
  isLoading = false,
  isError = false,
  error = null,
  isSuccess = true,
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
    <Push />
  ) : isError ? (
    push ? (
      <Push />
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
  ) : isSuccess ? (
    <div className="p_page">{children}</div>
  ) : null;
};
export default WrapPageAPI;
