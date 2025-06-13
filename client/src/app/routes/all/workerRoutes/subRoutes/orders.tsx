import { FB_404 } from "@/app/routes/helpers/FB";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
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
    FB_404(),
  ],
};
