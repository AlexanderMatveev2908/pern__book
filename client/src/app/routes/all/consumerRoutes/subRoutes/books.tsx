import ConsumerBooksLayout from "@/app/layouts/ConsumerLayout/subLayouts/ConsumerBooksLayout";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BookPageConsumer from "@/pages/ConsumerLayout/BookPageConsumer/BookPageConsumer";
import BookListSearch from "@/pages/ConsumerLayout/BooksListSearch/BookListSearch";

const consumerBooksRoutes = {
  path: "books",
  element: <ConsumerBooksLayout />,
  children: [
    {
      index: true,
      element: (
        <SearchCtxProvider>
          <BookListSearch />
        </SearchCtxProvider>
      ),
    },
    {
      path: ":bookID",
      element: <BookPageConsumer />,
    },
  ],
};

export default consumerBooksRoutes;
