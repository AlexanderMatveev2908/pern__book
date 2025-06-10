import { NumericFilterSearch } from "@/types/types";
import { FaDatabase } from "react-icons/fa";
import { v4 } from "uuid";
import { addSortFields, priceFilters, qtyFilters } from "../general/general";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { allUsersTxtFieldsInput, booksSorters } from "../general/books";

export const fieldsInputsBooks = [
  ...allUsersTxtFieldsInput,
  {
    field: "ID",
    label: "Book ID",
    place: "Book ID...",
  },
  {
    field: "bookStoreID",
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

export const ownerBooksNumericFilters: NumericFilterSearch[] = addNestedIDs([
  priceFilters,
  qtyFilters,
]) as NumericFilterSearch[];

export const ownerBooksSorters = addSortFields([
  ...booksSorters,
  {
    label: "Quantity",
    field: "qtySort",
    icon: FaDatabase,
  },
]);
