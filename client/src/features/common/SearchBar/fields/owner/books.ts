import { captAll } from "@/core/lib/lib";
import { categoriesBooks } from "@/types/all/books";
import { FilterSearch, NumericFilterSearch } from "@/types/types";
import { FaDatabase, FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { v4 } from "uuid";
import { TbPigMoney } from "react-icons/tb";
import { CatBookStore } from "@/types/all/bookStore";
import {
  addSortFields,
  createdUpdateAtFields,
  priceFilters,
  qtyFilters,
  ratingRanges,
} from "../general/general";
import { addNestedIDs } from "@/core/lib/all/utils/ids";
import { allUsersTxtFieldsInput } from "../general/books";

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

const filtersCat: Omit<FilterSearch, "id"> = {
  label: "Main categories",
  field: "mainCategories",
  icon: MdOutlineCategory,
  fields: Object.values(CatBookStore).map((el) => ({
    val: el,
    label: captAll(el),
  })),
};
const filtersSubCat: Omit<FilterSearch, "id"> = {
  label: "Sub categories",
  field: "subCategories",
  icon: MdOutlineCategory,
  fields: categoriesBooks.map((el) => ({
    val: el,
    label: captAll(el),
  })),
};

const filtersRating = {
  label: "Avg rating",
  field: "avgRating",
  icon: FaRegStar,
  fields: ratingRanges.map((el) => ({
    val: el,
    label: el,
  })),
};

export const ownerBooksFilters = [filtersCat, filtersSubCat, filtersRating].map(
  (el) => ({
    ...el,
    id: v4(),
    fields: el.fields.map((el) => ({
      ...el,
      id: v4(),
    })),
  })
);

export const ownerBooksNumericFilters: NumericFilterSearch[] = addNestedIDs([
  priceFilters,
  qtyFilters,
]) as NumericFilterSearch[];

export const ownerBooksSorters = addSortFields([
  ...createdUpdateAtFields,
  {
    label: "Avg rating",
    field: "ratingSort",
    icon: FaRegStar,
  },
  {
    label: "Price",
    field: "priceSort",
    icon: TbPigMoney,
  },
  {
    label: "Quantity",
    field: "qtySort",
    icon: FaDatabase,
  },
]);
