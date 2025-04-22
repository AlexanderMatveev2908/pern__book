import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { REG_PATH_HOME } from "../../config/regex";
import Header from "@/features/common/Header/Header";
import Toast from "@/features/common/Toast/Toast";
import Footer from "@/features/common/Footer/Footer";
import Hero from "@/features/common/Hero/Hero";
import Sidebar from "@/features/common/Sidebar/Sidebar";

const MainLayout: FC = () => {
  const path = useLocation().pathname;

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col relative">
      <Header />
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
