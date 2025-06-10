import { v4 } from "uuid";
import { addSortFields, filtersDelivery } from "../general/general";
import { FormFieldBasic } from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { ownerBooksNumericFilters } from "../owner/books";
import {
  allUsersTxtFieldsInput,
  booksFilters,
  booksSorters,
} from "../general/books";

export const consumerFieldsTxt: FormFieldBasic[] = allUsersTxtFieldsInput.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const consumerFiltersBooks = addNestedIDs([
  ...booksFilters,
  filtersDelivery,
]);

export const numericFiltersBooksConsumer = addNestedIDs(
  ownerBooksNumericFilters.filter((el) => el.field !== "qty")
);

export const sortersBooksConsumer = addSortFields(booksSorters);
