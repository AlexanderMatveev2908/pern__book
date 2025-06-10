import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import UserLayout from "@/app/layouts/UserLayout";
import ManageAccount from "@/pages/UserLayout/ManageAccount/ManageAccount";
import ProfileSettings from "@/pages/UserLayout/ProfileSettings/ProfileSettings";
import SecurityPwd from "@/pages/UserLayout/SecurityPwd/SecurityPwd";
import VerifyAccountLogged from "@/pages/UserLayout/VerifyAccountLogged/VerifyAccountLogged";
import Push from "../helpers/Push";

export const userRoutes = {
  path: "user",
  element: <UserLayout />,
  children: [
    {
      path: "verify-account",
      element: <VerifyAccountLogged />,
    },
    {
      path: "profile-settings",
      element: (
        <SwapCtxProvider>
          <ProfileSettings />
        </SwapCtxProvider>
      ),
    },
    {
      path: "manage-account",
      element: <ManageAccount />,
    },
    {
      path: "security",
      element: <SecurityPwd />,
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
