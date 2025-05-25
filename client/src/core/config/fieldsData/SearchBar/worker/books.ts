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

export const fieldsInputsBooksWorker: FormFieldBasic[] = fieldsInputsBooks.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);

export const workerBooksFiltersBooks: FilterSearch[] = ownerBooksFilters.map(
  (el) => ({
    ...el,
    id: v4(),
    fields: el.fields.map((sub) => ({
      ...sub,
      id: v4(),
    })),
  })
);

export const workerNumericFieldsBooks: NumericFilterSearch[] =
  ownerBooksNumericFilters.map((el) => ({
    ...el,
    id: v4(),
    fields: el.fields.map((sub) => ({
      ...sub,
      id: v4(),
    })),
  }));

export const workerSortersBooks: SorterSearch[] = ownerBooksSorters.map(
  (el) => ({
    ...el,
    id: v4(),
  })
);
