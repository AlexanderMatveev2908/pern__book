import { Title } from "@/components/components";
import VerifyEmailUser from "@/features/UserLayout/VerifyEmailUser";
import { FC } from "react";

const VerifyEmailPageUser: FC = () => {
  return (
    <div className="parent__page txt__col">
      <Title {...{ title: "Verify account" }} />
      <VerifyEmailUser />
    </div>
  );
};
export default VerifyEmailPageUser;
