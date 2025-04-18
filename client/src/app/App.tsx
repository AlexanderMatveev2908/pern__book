import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/AuthLayout/RegisterPage";
import LoginPage from "./pages/AuthLayout/LoginPage";
import VerifyEmailPage from "./pages/AuthLayout/VerifyEmailPage";
import ForgotPwdPage from "./pages/AuthLayout/ForgotPwdPage";
import NoticePage from "./pages/Notice/NoticePage";
import HomePage from "./pages/Home/HomePage";
import VerifyPage from "./pages/Verify/VerifyPage";
import TestPage from "./pages/Test/TestPage";
import { setNavigator } from "@/lib/lib";
import UserLayout from "./layouts/UserLayout";
import ProfileSettings from "./pages/UserLayout/ProfileSettings";
import ManageAccount from "./pages/UserLayout/ManageAccount";

const App: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<HomePage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-account" element={<VerifyEmailPage />} />
          <Route path="forgot-pwd" element={<ForgotPwdPage />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="manage-account" element={<ManageAccount />} />
        </Route>

        <Route path="notice" element={<NoticePage />} />

        <Route path="verify-cb" element={<VerifyPage />} />

        <Route path="protected" element={<TestPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
export default App;
