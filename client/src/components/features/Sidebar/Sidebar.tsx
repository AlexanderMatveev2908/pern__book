import { FC } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../store/store";

const Sidebar: FC = () => {
  const isSideOpen = useSelector(
    (state: RootStateType) => state.sidebar.isSideOpen
  );

  return (
    <>
      <div
        className={`w-full z__sidebar_bg inset-0 bg-black/50 ${
          isSideOpen ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed top-[80px] bottom-0 right-0 w-[500px] bg-[#000]  border-l-[3px] border-blue-600 transition-all duration-500 z__sidebar ${
          isSideOpen ? "opacity-100" : "opacity-0 translate-x-full"
        } `}
      ></div>
    </>
  );
};
export default Sidebar;
