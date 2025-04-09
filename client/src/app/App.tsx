import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}></Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default App;
