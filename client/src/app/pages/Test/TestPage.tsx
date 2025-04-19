import { WrapperLogged } from "@/components/components";
import { FC } from "react";

const TestPage: FC = () => {
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
