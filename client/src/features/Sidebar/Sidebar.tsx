import { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../store/store";
import { getSIde, setIsSideOpen } from "../Header/headerSlice";
// import UserEmail from "./components/UserEmail";
import SideLink from "./components/SideLink";
import NonLoggedDrop from "./components/NonLoggedDrop";
import { sideFieldsAllUsers } from "../../config/fields/fields";
import { getAuthState } from "../AuthLayout/authSlice";

const Sidebar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const authState = useSelector(getAuthState);
  const isLogged = authState.isLogged;

  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sideRef.current && !sideRef.current.contains(e.target as Node))
        dispatch(setIsSideOpen(false));
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleSideClick = () => dispatch(setIsSideOpen(false));

  return (
    <>
      <div
        className={`w-full z__sidebar_bg inset-0 bg-black/50 ${
          isSideOpen ? "fixed" : "hidden"
        }`}
      ></div>
      <div
        ref={sideRef}
        className={`fixed top-[80px] bottom-0 right-0 w-[300px] sm:w-[500px] bg-[#000]  border-l-[3px] border-blue-600 transition-all duration-500 z__sidebar txt__col overflow-y-auto scrollbar__y scrollbar__app ${
          isSideOpen ? "opacity-100" : "opacity-0 translate-x-full"
        } `}
      >
        <div className="max-w-full relative grid gap-4">
          {/* <UserEmail {...{ email: "JohnDoe@gmail.com" }} /> */}

          <div className={`grid gap-5 px-5 ${isLogged ? "" : "pt-5"}`}>
            {sideFieldsAllUsers.map((el) => (
              <SideLink key={el.id} {...{ el, handleSideClick }} />
            ))}

            <NonLoggedDrop {...{ handleSideClick }} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
