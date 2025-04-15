import SpinnerPage from "@/components/common/spinners/SpinnerPage/SpinnerPage";
import { useScroll } from "@/hooks/hooks";
import { FC } from "react";

const VerifyPage: FC = () => {
  useScroll();

  return (
    <div className="min-h-[100vh] relative -mt-[50px]">
      <SpinnerPage />
    </div>
  );
};
export default VerifyPage;
