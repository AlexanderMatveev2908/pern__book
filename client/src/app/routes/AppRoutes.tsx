import MainLayout from "@/app/layouts/MainLayout";
import HomePage from "@/pages/Home/HomePage";
import authRoutes from "./all/AuthRoutes";
import userRoutes from "./all/UserRoutes";
import ownerRoutes from "./all/ownerRoutes/OwnerRoutes";
import workerRoutes from "./all/workerRoutes/WorkerRoutes";
import Notice from "@/pages/Notice/NoticePage";
import VerifyCb from "@/pages/VerifyCb/VerifyCb";
import { Navigate } from "react-router-dom";
import consumerRoutes from "./all/consumerRoutes/ConsumerRoutes";

const appRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },

      authRoutes,
      userRoutes,

      ownerRoutes,
      workerRoutes,

      consumerRoutes,

      { path: "notice", element: <Notice /> },
      { path: "verify-cb", element: <VerifyCb /> },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> }, // global fallback
];

export default appRoutes;
