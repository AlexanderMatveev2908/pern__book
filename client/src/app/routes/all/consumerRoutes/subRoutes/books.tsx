import ConsumerBooksLayout from "@/app/layouts/ConsumerLayout/subLayouts/ConsumerBooksLayout";
import SearchCtxProvider from "@/core/contexts/SearchCtx/SearchCtxProvider";
import BookPageConsumer from "@/pages/ConsumerLayout/books/BookPageConsumer/BookPageConsumer";
import BookListConsumer from "@/pages/ConsumerLayout/books/BooksListConsumer/BookListConsumer";

const consumerBooksRoutes = {
  path: "books",
  element: <ConsumerBooksLayout />,
  children: [
    {
      index: true,
      element: (
        <SearchCtxProvider>
          <BookListConsumer />
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
