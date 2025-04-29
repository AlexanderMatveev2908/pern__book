import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import NoticePage from "./pages/Notice/NoticePage";
import HomePage from "./pages/Home/HomePage";
import VerifyPage from "./pages/Verify/VerifyPage";
import { setNavigator } from "@/lib/lib";
import UserLayout from "./layouts/UserLayout";
import { useNinjaToken } from "@/hooks/hooks";
import OwnerLayout from "./layouts/OwnerLayout";
import CreateBooksStorePage from "./pages/OwnerLayout/CreateBooksStorePage";
import Register from "./pages/AuthLayout/Register/Register";
import Login from "./pages/AuthLayout/Login/Login";
import ForgotPwd from "./pages/AuthLayout/ForgotPwd/ForgotPwd";
import VerifyAccount from "./pages/AuthLayout/VerifyAccount/VerifyAccount";
import ChoseNewPwd from "./pages/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import ProfileSettings from "./pages/UserLayout/ProfileSettings/ProfileSettings";
import ManageAccount from "./pages/UserLayout/ManageAccount/ManageAccount";
import VerifyAccountLogged from "./pages/UserLayout/VerifyAccountLogged/VerifyAccountLogged";
import SecurityPwd from "./pages/UserLayout/SecurityPwd/SecurityPwd";

const App: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index={true} element={<HomePage />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="verify-account" element={<VerifyAccount />} />
          <Route path="forgot-pwd" element={<ForgotPwd />} />
          <Route path="chose-new-pwd" element={<ChoseNewPwd />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route path="verify-account" element={<VerifyAccountLogged />} />
          <Route path="profile-settings" element={<ProfileSettings />} />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path="security" element={<SecurityPwd />} />
        </Route>

        <Route path="owner" element={<OwnerLayout />}>
          <Route path="create" element={<CreateBooksStorePage />} />
        </Route>

        <Route path="notice" element={<NoticePage />} />
        <Route path="verify-cb" element={<VerifyPage />} />

        {/* <Route path="chat" element={<Chat />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
export default App;
