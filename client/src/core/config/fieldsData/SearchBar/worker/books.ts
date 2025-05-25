import { v4 } from "uuid";
import { fieldsInputsBooks, ownerBooksFilters } from "../owner/books";

export const fieldsInputsBooksWorker = fieldsInputsBooks.map((el) => ({
  ...el,
  id: v4(),
}));

export const workerBooksFilters = ownerBooksFilters.map((el) => ({
  ...el,
  id: v4(),
  fields: el.fields.map((sub) => ({
    ...sub,
    id: v4(),
  })),
}));
