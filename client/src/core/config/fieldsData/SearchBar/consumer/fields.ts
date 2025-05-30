import { v4 } from "uuid";
import { addSortFields, allUsersTxtFieldsInput } from "../general";
import { FormFieldBasic } from "@/types/types";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import {
  ownerBooksFilters,
  ownerBooksNumericFilters,
  ownerBooksSorters,
} from "../owner/books";

export const consumerFieldsTxt: FormFieldBasic[] = allUsersTxtFieldsInput.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const consumerFiltersBooks = addNestedIDs(ownerBooksFilters);

export const numericFiltersBooksConsumer = addNestedIDs(
  ownerBooksNumericFilters.filter((el) => el.field !== "qty")
);

export const sortersBooksConsumer = ownerBooksSorters
  .filter((el) => el.field !== "qty")
  .map((el) => ({
    ...el,
    id: v4(),
    fields: addSortFields(),
  }));
