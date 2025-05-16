import { v4 } from "uuid";

export const fieldsInputsBooks = [
  {
    field: "title",
    label: "Title",
    place: "Book title...",
  },
  {
    field: "author",
    label: "Author",
    place: "Author name...",
  },
  {
    field: "year",
    label: "Year",
    place: "Year...",
  },
  {
    field: "ID",
    label: "Book ID",
    place: "Book ID...",
  },
  {
    field: "bookstoreID",
    label: "Bookstore ID",
    place: "Bookstore ID...",
  },
  {
    field: "bookStoreName",
    label: "Bookstore name",
    place: "Bookstore name...",
  },
].map((el) => ({
  ...el,
  id: v4(),
}));
