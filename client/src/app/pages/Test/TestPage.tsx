/* eslint-disable @typescript-eslint/no-explicit-any */
import { WrapperLogged } from "@/components/components";
import { FC } from "react";
import { useGetSomeQuery } from "./testSliceAPI";
import { useWrapQueryAPI } from "@/hooks/hooks";
import { getData } from "@/lib/lib";

const TestPage: FC = () => {
  const res = useGetSomeQuery({});
  useWrapQueryAPI({
    ...res,
    pushNotice: [!!1, () => console.log("error logged")],
  } as any);

  const { data } = res;
  const msg: string = getData(data, "msg");

  console.log(msg);
  return (
    <WrapperLogged>
      <div className="parent__page txt__col">
        <div className="w-full flex justify-center">
          <span className="txt__6">Protected page</span>
        </div>
      </div>
    </WrapperLogged>
  );
};
export default TestPage;
