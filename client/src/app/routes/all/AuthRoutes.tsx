import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import AuthLayout from "@/app/layouts/AuthLayout";
import ChoseNewPwd from "@/pages/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import ForgotPwdPage from "@/pages/AuthLayout/ForgotPwdPage";
import LoginPage from "@/pages/AuthLayout/LoginPage";
import RegisterPage from "@/pages/AuthLayout/RegisterPage";
import VerifyAccountPage from "@/pages/AuthLayout/VerifyAccountPage";
import Push from "../helpers/Push";

export const authRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      path: "register",
      element: (
        <SwapCtxProvider>
          <RegisterPage />
        </SwapCtxProvider>
      ),
    },
    { path: "login", element: <LoginPage /> },
    { path: "verify-account", element: <VerifyAccountPage /> },
    { path: "forgot-pwd", element: <ForgotPwdPage /> },
    { path: "chose-new-pwd", element: <ChoseNewPwd /> },
    { path: "*", element: <Push /> },
  ],
};
