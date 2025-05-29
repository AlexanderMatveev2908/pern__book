import SearchLayout from "@/layouts/SearchLayout/SearchLayout";
import BookListSearch from "@/pages/SearchLayout/BookListSearch";

const searchRoutes = {
  path: "search",
  element: <SearchLayout />,
  children: [
    {
      index: true,
      element: <BookListSearch />,
    },
  ],
};

export default searchRoutes;
