import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/AuthLayout/RegisterPage";
import LoginPage from "./pages/AuthLayout/LoginPage";
import VerifyEmailPage from "./pages/AuthLayout/VerifyEmailPage";
import ForgotPwdPage from "./pages/AuthLayout/ForgotPwdPage";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="verify-account" element={<VerifyEmailPage />} />
          <Route path="forgot-pwd" element={<ForgotPwdPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
