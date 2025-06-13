import SwapCtxProvider from "@/core/contexts/SwapCtx/SwapAddressProvider";
import AuthLayout from "@/app/layouts/AuthLayout";
import Login from "@/features/AuthLayout/pages/Login/Login";
import ForgotPwd from "@/features/AuthLayout/pages/ForgotPwd/ForgotPwd";
import VerifyAccount from "@/features/AuthLayout/pages/VerifyAccount/VerifyAccount";
import ChoseNewPwd from "@/features/AuthLayout/pages/ChoseNewPwd/ChoseNewPwd";
import Register from "@/features/AuthLayout/pages/Register/Register";
import { FB_404 } from "../helpers/FB";

export const authRoutes = {
  path: "auth",
  element: <AuthLayout />,
  children: [
    {
      path: "register",
      element: (
        <SwapCtxProvider>
          <Register />
        </SwapCtxProvider>
      ),
    },
    { path: "login", element: <Login /> },
    { path: "verify-account", element: <VerifyAccount /> },
    { path: "forgot-pwd", element: <ForgotPwd /> },
    { path: "chose-new-pwd", element: <ChoseNewPwd /> },
    FB_404(),
  ],
};
