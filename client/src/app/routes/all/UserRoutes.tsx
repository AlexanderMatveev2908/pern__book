import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import UserLayout from "@/app/layouts/UserLayout";
import Push from "../helpers/Push";
import VerifyAccountLogged from "@/features/UserLayout/pages/VerifyAccountLogged/VerifyAccountLogged";
import ProfileSettings from "@/features/UserLayout/pages/ProfileSettings/ProfileSettings";
import ManageAccount from "@/features/UserLayout/pages/ManageAccount/ManageAccount";
import SecurityPwd from "@/features/UserLayout/pages/SecurityPwd/SecurityPwd";

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
