import MainLayout from "@/app/layouts/MainLayout";
import ownerRoutes from "./all/ownerRoutes/OwnerRoutes";
import { authRoutes } from "./all/AuthRoutes";
import { userRoutes } from "./all/UserRoutes";
import { workerRoutes } from "./all/workerRoutes/WorkerRoutes";
import { consumerRoutes } from "./all/consumerRoutes/ConsumerRoutes";
import Push from "./helpers/Push";
import Notice from "@/features/Notice/Notice";
import VerifyCb from "@/features/VerifyCb/VerifyCb";
import HomePage from "@/features/HomePage/HomePage";

export const appRoutes = [
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

      { path: "*", element: <Push /> },
    ],
  },

  { path: "*", element: <Push /> },
];
