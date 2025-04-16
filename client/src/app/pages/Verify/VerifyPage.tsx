import VerifyCb from "@/features/VerifyCb/VerifyCb";
import { useScroll } from "@/hooks/hooks";
import { FC } from "react";

const VerifyPage: FC = () => {
  useScroll();

  return <VerifyCb />;
};
export default VerifyPage;
