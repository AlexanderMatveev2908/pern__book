import Push from "@/app/routes/helpers/Push";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import OrderPageWorker from "@/pages/WorkerLayout/OrdersLayout/OrderPage/OrderPageWorker";
import OrdersListWorker from "@/pages/WorkerLayout/OrdersLayout/OrdersList/OrdersList";
import UpdateOrderWorker from "@/pages/WorkerLayout/OrdersLayout/UpdateOrder/UpdateOrderWorker";
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
    {
      path: "patch/:orderID",
      element: <UpdateOrderWorker />,
    },
    {
      path: "*",
      element: <Push />,
    },
  ],
};
