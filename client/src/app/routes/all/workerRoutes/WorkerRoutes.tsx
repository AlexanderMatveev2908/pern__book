import WorkerLayout from "@/app/layouts/WorkerLayout/WorkerLayout";
import { Navigate } from "react-router-dom";
import { bookStoresWorkerRoutes } from "./subRoutes/bookStores";
import { booksWorkerRoutes } from "./subRoutes/books";

export const workerRoutes = {
  path: "worker",
  element: <WorkerLayout />,
  children: [
    bookStoresWorkerRoutes,
    booksWorkerRoutes,
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ],
};
