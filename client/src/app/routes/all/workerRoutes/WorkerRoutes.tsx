import WorkerLayout from "@/app/layouts/WorkerLayout/WorkerLayout";
import { Navigate } from "react-router-dom";
import booksWorkerRoutes from "./subRoutes/books";
import bookStoresWorkerRoutes from "./subRoutes/bookStores";

const workerRoutes = {
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

export default workerRoutes;
