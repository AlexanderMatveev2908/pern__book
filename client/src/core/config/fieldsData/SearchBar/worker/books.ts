import { v4 } from "uuid";
import {
  fieldsInputsBooks,
  ownerBooksFilters,
  ownerBooksNumericFilters,
  ownerBooksSorters,
} from "../owner/books";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";

export const fieldsInputsBooksWorker: FormFieldBasic[] = fieldsInputsBooks
  .filter((el) => !el.field.includes("bookStore"))
  .map((el) => ({
    ...el,
    id: v4(),
  }));

export const workerBooksFiltersBooks: FilterSearch[] =
  addNestedIDs(ownerBooksFilters);

export const workerNumericFieldsBooks: NumericFilterSearch[] = addNestedIDs(
  ownerBooksNumericFilters
);

export const workerSortersBooks: SorterSearch[] = ownerBooksSorters.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);
