import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/Home/HomePage";
import { setNavigator } from "@/core/lib/lib";
import UserLayout from "./layouts/UserLayout";
import { useNinjaToken } from "@/core/hooks/hooks";
import OwnerLayout from "./layouts/OwnerLayout";
import CreateBooksStorePage from "./pages/OwnerLayout/CreateBooksStore/CreateBooksStorePage";
import Register from "./pages/AuthLayout/Register/Register";
import Login from "./pages/AuthLayout/Login/Login";
import ForgotPwd from "./pages/AuthLayout/ForgotPwd/ForgotPwd";
import VerifyAccount from "./pages/AuthLayout/VerifyAccount/VerifyAccount";
import ChoseNewPwd from "./pages/AuthLayout/ChoseNewPwd/ChoseNewPwd";
import ProfileSettings from "./pages/UserLayout/ProfileSettings/ProfileSettings";
import ManageAccount from "./pages/UserLayout/ManageAccount/ManageAccount";
import VerifyAccountLogged from "./pages/UserLayout/VerifyAccountLogged/VerifyAccountLogged";
import SecurityPwd from "./pages/UserLayout/SecurityPwd/SecurityPwd";
import VerifyCb from "./pages/VerifyCb/VerifyCb";
import Notice from "./pages/Notice/NoticePage";
import SwapCtxProvider from "./core/contexts/SwapCtx/SwapAddressProvider";
import BookStorePage from "./pages/OwnerLayout/BookStorePage/BookStorePage";

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
          <Route
            path="register"
            element={
              <SwapCtxProvider>
                <Register />
              </SwapCtxProvider>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="verify-account" element={<VerifyAccount />} />
          <Route path="forgot-pwd" element={<ForgotPwd />} />
          <Route path="chose-new-pwd" element={<ChoseNewPwd />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route path="verify-account" element={<VerifyAccountLogged />} />
          <Route
            path="profile-settings"
            element={
              <SwapCtxProvider>
                <ProfileSettings />
              </SwapCtxProvider>
            }
          />
          <Route path="manage-account" element={<ManageAccount />} />
          <Route path="security" element={<SecurityPwd />} />
        </Route>

        <Route path="owner" element={<OwnerLayout />}>
          <Route
            path="create-book-store"
            element={
              <SwapCtxProvider>
                <CreateBooksStorePage />
              </SwapCtxProvider>
            }
          />
          <Route path="book-store/:bookStoreID" element={<BookStorePage />} />
        </Route>

        <Route path="notice" element={<Notice />} />
        <Route path="verify-cb" element={<VerifyCb />} />

        {/* <Route path="chat" element={<Chat />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
export default App;
