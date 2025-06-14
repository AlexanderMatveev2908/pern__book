import { FB_404 } from "@/app/routes/helpers/FB";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrderPageWorker from "@/features/WorkerLayout/OrdersLayout/pages/OrderPageWorker/OrderPageWorker";
import OrdersListWorker from "@/features/WorkerLayout/OrdersLayout/pages/OrdersListWorker/OrdersListWorker";
import { Outlet } from "react-router-dom";

export const ordersWorkerRoutes = {
  path: "orders",
  element: <Outlet />,
  children: [
    {
      path: "list/:bookStoreID",
      element: (
        <SearchCtxProvider>
          <OrdersListWorker />
        </SearchCtxProvider>
      ),
    },
    {
      path: ":orderID",
      element: <OrderPageWorker />,
    },
    FB_404(),
  ],
};
