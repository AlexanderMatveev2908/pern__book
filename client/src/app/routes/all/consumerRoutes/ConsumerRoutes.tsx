import ConsumerLayout from "@/app/layouts/ConsumerLayout/ConsumerLayout";
import consumerBooksRoutes from "./subRoutes/books";

const consumerRoutes = {
  path: "consumer",
  element: <ConsumerLayout />,
  children: [consumerBooksRoutes],
};

export default consumerRoutes;
