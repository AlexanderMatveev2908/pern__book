import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../../store/store";
import { getSIde, setIsSideOpen } from "../Header/headerSlice";
// import UserEmail from "./components/UserEmail";
import SideLink from "./components/SideLink";
import { getAuthState } from "../../AuthLayout/authSlice";
import { useGetUserProfileQuery } from "../../UserLayout/userSliceAPI";
import { getData, isObjOk } from "@/lib/lib";
import UserEmail from "./components/UserEmail";
import SidebarDrop from "./components/SidebarDrop";
import SideLogout from "./components/SideLogout";
import { UserType } from "@/types/types";
import {
  fieldAccountLogged,
  fieldAccountNonLogged,
  fieldAdminDrop,
  fieldWorkerDrop,
  sideFieldsAdmin,
  sideFieldsAllUsers,
  sideFieldsLogged,
  sideFieldsNonLogged,
  sideFieldsWorker,
} from "@/config/fields/Sidebar/sidebarFields";
import { LinksLoggedDrop } from "@/config/fields/general/fieldsActionsAuth";

const Sidebar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState<null | string>(null);

  const authState = useSelector(getAuthState);
  const isLogged = authState.isLogged;
  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;

  const { data } = useGetUserProfileQuery() ?? {};
  const user: UserType = getData(data, "user");

  useEffect(() => {
    if (isObjOk(user)) setEmail(user.email);
  }, [user]);

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

  const propsAccount = useMemo(
    () => ({
      arr: authState.isLogged
        ? sideFieldsLogged.filter((el) =>
            authState.isLogged && user?.isVerified
              ? el.path !== LinksLoggedDrop.VERIFY_EMAIL_LOGGED
              : el
          )
        : sideFieldsNonLogged,
      label: authState.isLogged ? fieldAccountLogged : fieldAccountNonLogged,
    }),
    [authState.isLogged, user?.isVerified]
  );

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
          {typeof email === "string" && isLogged && (
            <UserEmail {...{ email }} />
          )}

          <div className={`grid gap-5 px-5 ${isLogged ? "" : "pt-5"}`}>
            {sideFieldsAllUsers.map((el) => (
              <SideLink key={el.id} {...{ el }} />
            ))}

            <SidebarDrop {...propsAccount} />

            <SidebarDrop {...{ label: fieldAdminDrop, arr: sideFieldsAdmin }} />

            <SidebarDrop
              {...{ label: fieldWorkerDrop, arr: sideFieldsWorker }}
            />

            <SideLogout />
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
