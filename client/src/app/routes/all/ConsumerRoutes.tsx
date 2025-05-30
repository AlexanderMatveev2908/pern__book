import ConsumerLayout from "@/layouts/ConsumerLayout/ConsumerLayout";
import BookListSearch from "@/pages/SearchLayout/BooksListSearch/BookListSearch";

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
