import ConsumerLayout from "@/app/layouts/ConsumerLayout/ConsumerLayout";
import BookListSearch from "@/pages/ConsumerLayout/BooksListSearch/BookListSearch";

const consumerRoutes = {
  path: "search",
  element: <ConsumerLayout />,
  children: [
    {
      index: true,
      element: <BookListSearch />,
    },
  ],
};

export default consumerRoutes;
