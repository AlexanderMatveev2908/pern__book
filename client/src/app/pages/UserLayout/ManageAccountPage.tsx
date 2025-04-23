import { Title } from "@/components/components";
import ManageAccount from "@/features/UserLayout/ManageAccount/ManageAccount";
import { FC } from "react";
import { useScroll } from "./../../../hooks/all/useScroll";

const ManageAccountPage: FC = () => {
  useScroll();

  return (
    <div className="parent__page txt__col">
      <Title {...{ title: "My account" }} />
      <ManageAccount />
    </div>
  );
};
export default ManageAccountPage;
