/* eslint-disable @typescript-eslint/no-explicit-any */
import { WrapPageAPI, WrapperLogged } from "@/components/components";
import { FC } from "react";
import { useGetSomeQuery } from "./testSliceAPI";
import { useWrapQueryAPI } from "@/hooks/hooks";

const TestPage: FC = () => {
  const res = useGetSomeQuery({});
  useWrapQueryAPI({
    ...res,
  } as any);

  return (
    // <WrapperLogged>
    //   <WrapPageAPI {...{ ...res }}>
    <div className="parent__page txt__col">
      <div className="w-full flex justify-center">
        <span className="txt__6">Protected page</span>
      </div>
    </div>
    // </WrapPageAPI>
    // </WrapperLogged>
  );
};
export default TestPage;
