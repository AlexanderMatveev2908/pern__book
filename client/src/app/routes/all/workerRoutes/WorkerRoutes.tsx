import WorkerLayout from "@/app/layouts/WorkerLayout/WorkerLayout";
import { bookStoresWorkerRoutes } from "./subRoutes/bookStores";
import { booksWorkerRoutes } from "./subRoutes/books";
import { ordersWorkerRoutes } from "./subRoutes/orders";
import { FB_404 } from "../../helpers/FB";

export const workerRoutes = {
  path: "worker",
  element: <WorkerLayout />,
  children: [
    bookStoresWorkerRoutes,
    booksWorkerRoutes,
    ordersWorkerRoutes,
    FB_404(),
  ],
};
