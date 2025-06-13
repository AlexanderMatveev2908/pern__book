import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import UserLayout from "@/app/layouts/UserLayout";
import ManageAccountPage from "@/pages/UserLayout/ManageAccountPage";
import SecurityPwdPage from "@/pages/UserLayout/SecurityPwdPage";
import VerifyAccountLogged from "@/pages/UserLayout/VerifyAccountLogged/VerifyAccountLogged";
import Push from "../helpers/Push";
import ProfileSettingsPage from "@/pages/UserLayout/ProfileSettingsPage";

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
          <ProfileSettingsPage />
        </SwapCtxProvider>
      ),
    },
    {
      path: "manage-account",
      element: <ManageAccountPage />,
    },
    {
      path: "security",
      element: <SecurityPwdPage />,
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
