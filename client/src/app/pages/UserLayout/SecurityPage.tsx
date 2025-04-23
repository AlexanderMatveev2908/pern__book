import { Title } from "@/components/components";
import SecurityPwd from "@/features/UserLayout/SecurityPwd";
import { useScroll } from "@/hooks/hooks";
import { FC } from "react";

const SecurityPage: FC = () => {
  useScroll();

  return (
    <div className="parent__page txt__col">
      <Title {...{ title: "Confirm your password" }} />
      <SecurityPwd />
    </div>
  );
};
export default SecurityPage;
