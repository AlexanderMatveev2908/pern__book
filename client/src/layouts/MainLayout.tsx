import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/common/Header/Header";
import Toast from "@/features/common/Toast/Toast";
import Hero from "@/common/Hero/Hero";
import Sidebar from "@/features/common/Sidebar/Sidebar";
import Popup from "@/common/Popup/Popup";
import Footer from "@/common/Footer/Footer";
import { REG_PATH_HOME } from "@/core/config/regex";

const MainLayout: FC = () => {
  const path = useLocation().pathname;

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col relative">
      <Header />
      <Popup />
      <Toast />
      <Sidebar />
      {REG_PATH_HOME.test(path) && <Hero />}
      <div className="w-full px-5 sm:px-10 pt-6 pb-[300px] flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
