import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/common/Header/Header";
import Toast from "@/common/Toast/Toast";
import Sidebar from "@/common/Sidebar/Sidebar";
import Popup from "@/common/Popup/Popup";
import Footer from "@/common/Footer/Footer";

const MainLayout: FC = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col relative">
      <Header />
      <Popup />
      <Toast />
      <Sidebar />
      <div className="w-full px-5 sm:px-10 pt-6 pb-[200px] flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
