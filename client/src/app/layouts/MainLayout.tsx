import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../features/Header/Header";
import Sidebar from "../../features/Sidebar/Sidebar";
import Hero from "../../features/Hero/Hero";
import { REG_PATH_HOME } from "../../config/regex";
import Toast from "../../features/Toast/Toast";
import Footer from "../../features/Footer/Footer";

const MainLayout: FC = () => {
  const path = useLocation().pathname;

  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col relative">
      <Header />
      <Toast />
      {REG_PATH_HOME.test(path) && <Hero />}
      <Sidebar />
      <div className="w-full px-5 sm:px-10 pt-6 pb-[300px] flex justify-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default MainLayout;
