import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import AuthLayout from "@/app/layouts/AuthLayout";
import ChoseNewPwd from "@/pages/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import ForgotPwd from "@/pages/AuthLayout/ForgotPwd/ForgotPwd";
import LoginPage from "@/pages/AuthLayout/LoginPage";
import RegisterPage from "@/pages/AuthLayout/RegisterPage";
import VerifyAccount from "@/pages/AuthLayout/VerifyAccount/VerifyAccount";
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
    { path: "verify-account", element: <VerifyAccount /> },
    { path: "forgot-pwd", element: <ForgotPwd /> },
    { path: "chose-new-pwd", element: <ChoseNewPwd /> },
    { path: "*", element: <Push /> },
  ],
};
