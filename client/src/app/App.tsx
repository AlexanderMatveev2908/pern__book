import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="auth" element={<AuthLayout />}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
