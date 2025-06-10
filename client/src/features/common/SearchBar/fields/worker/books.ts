import { v4 } from "uuid";
import { fieldsInputsBooks, ownerBooksNumericFilters } from "../owner/books";
import {
  FilterSearch,
  FormFieldBasic,
  NumericFilterSearch,
  SorterSearch,
} from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { booksFilters, booksSorters } from "../general/books";
import { addSortFields } from "../general/general";
import { FaDatabase } from "react-icons/fa";

export const fieldsInputsBooksWorker: FormFieldBasic[] = fieldsInputsBooks
  .filter((el) => !el.field.includes("bookStore"))
  .map((el) => ({
    ...el,
    id: v4(),
  }));

export const workerBooksFiltersBooks: FilterSearch[] =
  addNestedIDs(booksFilters);

export const workerNumericFieldsBooks: NumericFilterSearch[] = addNestedIDs(
  ownerBooksNumericFilters
);

export const workerSortersBooks: SorterSearch[] = addSortFields([
  ...booksSorters,
  {
    label: "Quantity",
    field: "qtySort",
    icon: FaDatabase,
  },
]) as SorterSearch[];
