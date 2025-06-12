import WorkerLayout from "@/app/layouts/WorkerLayout/WorkerLayout";
import { bookStoresWorkerRoutes } from "./subRoutes/bookStores";
import { booksWorkerRoutes } from "./subRoutes/books";
import Push from "../../helpers/Push";
import { ordersWorkerRoutes } from "./subRoutes/orders";

export const workerRoutes = {
  path: "worker",
  element: <WorkerLayout />,
  children: [
    bookStoresWorkerRoutes,
    booksWorkerRoutes,
    ordersWorkerRoutes,
    {
      path: "*",
      element: <Push />,
    },
  ],
};
