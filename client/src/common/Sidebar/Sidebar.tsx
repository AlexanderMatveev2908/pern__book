import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType } from "../../core/store/store";
import {
  getSIde,
  setIsSideOpen,
} from "../../features/common/Header/headerSlice";
// import UserEmail from "./components/UserEmail";
import SideLink from "./components/SideLink";
import { getAuthState } from "../../features/AuthLayout/authSlice";
import { isObjOk } from "@/core/lib/lib";
import UserEmail from "./components/UserEmail";
import SidebarDrop from "./components/SidebarDrop";
import SideLogout from "./components/SideLogout";
import {
  labelCreateStore,
  labelAccountLogged,
  labelAccountNonLogged,
  labelAdminDrop,
  labelWorkerDrop,
  ownerOnlyPaths,
  sideFieldsAdmin,
  sideFieldsAllUsers,
  sideFieldsLogged,
  sideFieldsNonLogged,
  sideFieldsWorker,
} from "@/features/common/SideBar/fields/sidebar";
import { LinksLoggedDrop } from "@/features/AuthLayout/fields/links";
import FakeSideLink from "./components/FakeSideLink";
import { useGetU } from "@/core/hooks/all/api/useGetU";

const Sidebar: FC = () => {
  const sideRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState<null | string>(null);

  const authState = useSelector(getAuthState);
  const isLogged = authState.isLogged;
  const dispatch: DispatchType = useDispatch();
  const isSideOpen = useSelector(getSIde).isSideOpen;

  const { user } = useGetU();

  useEffect(() => {
    if (isObjOk(user)) setEmail(user?.email ?? "");
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
      label: authState.isLogged ? labelAccountLogged : labelAccountNonLogged,
    }),
    [authState.isLogged, user?.isVerified]
  );

  const fieldsAdmin = useMemo(
    () =>
      sideFieldsAdmin.filter((el) => {
        if (ownerOnlyPaths.includes(el.path)) return user?.isOwner;
        if (el.path === "/owner/team") return user?.hasWorkers;
        if (el.path === "/owner/books/list") return user?.hasBooks;
        if (el.path === "/owner/orders/list") return user?.hasBusinessOrders;

        return true;
      }),
    [user]
  );

  const fieldsAllUsers = useMemo(
    () =>
      sideFieldsAllUsers.filter((el) => {
        if (el.path === "/consumer/cart/summary") return user?.cartCount;
        else if (el.path === "/consumer/orders/list")
          return user?.hasConsumerOrders;
        return true;
      }),
    [user]
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
        className={`fixed top-[80px] pb-[50px] bottom-0 right-0 w-[300px] sm:w-[500px] bg-[#000]  border-l-[3px] border-blue-600 transition-all duration-500 z__sidebar txt__col overflow-y-auto scroll_y scroll_app ${
          isSideOpen ? "opacity-100" : "opacity-0 translate-x-full"
        } `}
      >
        <div className="max-w-full relative grid gap-4">
          {typeof email === "string" && isLogged && (
            <UserEmail {...{ email }} />
          )}

          <div className={`grid gap-5 px-5 ${isLogged ? "" : "pt-5"}`}>
            {fieldsAllUsers.map((el) =>
              el.path === "/consumer/cart/summary" ? (
                <div
                  key={el.id}
                  className="w-full flex justify-start gap-6 items-center"
                >
                  <SideLink {...{ el }} />

                  <div className="w-[35px] h-[35px] border-2 border-blue-600 rounded-xl p-3 flex justify-center items-center">
                    <span className="txt__3">{user?.cartCount ?? 0}</span>
                  </div>
                </div>
              ) : (
                <SideLink key={el.id} {...{ el }} />
              )
            )}

            <SidebarDrop {...propsAccount} />

            {authState.isLogged && (
              <SidebarDrop {...{ label: labelAdminDrop, arr: fieldsAdmin }}>
                {user?.isVerified ? null : (
                  <FakeSideLink {...{ el: labelCreateStore }} />
                )}
              </SidebarDrop>
            )}

            {user?.isWorker && (
              <SidebarDrop
                {...{ label: labelWorkerDrop, arr: sideFieldsWorker }}
              />
            )}
            {authState.isLogged && <SideLogout />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
