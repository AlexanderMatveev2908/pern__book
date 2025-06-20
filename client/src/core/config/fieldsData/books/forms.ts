import { FormFieldBasic } from "@/types/types";
import { v4 } from "uuid";

export const titleBookField = {
  field: "title",
  label: "Book Title *",
  place: "Book title...",
};

export const fieldDescBook: FormFieldBasic = {
  field: "description",
  place: "About book...",
};

export const fieldAuthor = {
  field: "author",
  label: "Author *",
  place: "Author name...",
};
export const fieldYear = {
  field: "year",
  label: "Year *",
  place: "Year...",
};

export const fieldAuthY = [fieldAuthor, fieldYear].map((el) => ({
  ...el,
  id: v4(),
}));

export const fieldBookQty = {
  field: "qty",
  label: "Quantity *",
  place: "Quantity...",
};
export const fieldPrice = {
  field: "price",
  label: "Price *",
  place: "Price...",
};

export const fieldsPriceQty = [fieldBookQty, fieldPrice].map((el) => ({
  ...el,
  id: v4(),
}));
