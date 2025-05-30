import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import searchRoutes from "./all/SearchRoutes";
import authRoutes from "./all/AuthRoutes";
import userRoutes from "./all/UserRoutes";
import ownerRoutes from "./all/ownerRoutes/OwnerRoutes";
import workerRoutes from "./all/workerRoutes/WorkerRoutes";
import Notice from "@/pages/Notice/NoticePage";
import VerifyCb from "@/pages/VerifyCb/VerifyCb";
import { Navigate } from "react-router-dom";

const appRoutes = [
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

export default appRoutes;
