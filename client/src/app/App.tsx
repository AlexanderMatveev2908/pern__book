import { FC, useEffect } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import { setNavigator } from "@/core/lib/lib";
import { useNinjaToken, useScroll } from "@/core/hooks/hooks";
import VerifyCb from "../pages/VerifyCb/VerifyCb";
import Notice from "../pages/Notice/NoticePage";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import ownerRoutes from "./routes/ownerRoutes/OwnerRoutes";
import workerRoutes from "./routes/workerRoutes/WorkerRoutes";
import searchRoutes from "./routes/SearchRoutes";

const allRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      searchRoutes,

      authRoutes,
      userRoutes,
      ownerRoutes,
      workerRoutes,

      { path: "notice", element: <Notice /> },
      { path: "verify-cb", element: <VerifyCb /> },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> }, // global fallback
];

const App: FC = () => {
  useScroll();

  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  useNinjaToken();

  return useRoutes(allRoutes);
};
export default App;
