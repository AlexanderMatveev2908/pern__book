import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/features/Header/Header";
import Sidebar from "../../components/features/Sidebar/Sidebar";
import Hero from "../../components/features/Hero/Hero";

const MainLayout: FC = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-950 flex flex-col relative">
      <Header />
      <Hero />
      <Sidebar />
      <div className="w-full px-10 grid content-center"></div>
      <Outlet />
    </div>
  );
};
export default MainLayout;
