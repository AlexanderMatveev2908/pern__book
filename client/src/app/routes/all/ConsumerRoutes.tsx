import ConsumerLayout from "@/app/layouts/ConsumerLayout/ConsumerLayout";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BookListSearch from "@/pages/ConsumerLayout/BooksListSearch/BookListSearch";

const consumerRoutes = {
  path: "search",
  element: <ConsumerLayout />,
  children: [
    {
      index: true,
      element: (
        <SearchCtxProvider>
          <BookListSearch />
        </SearchCtxProvider>
      ),
    },
  ],
};

export default consumerRoutes;
