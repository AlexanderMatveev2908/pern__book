import { captAll } from "@/core/lib/lib";
import { categoriesBooks } from "@/types/all/books";
import { CatBookStore } from "@/types/all/bookStore";
import { FilterSearch } from "@/types/types";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { addSortFields, createdUpdateAtFields, ratingRanges } from "./general";
import { v4 } from "uuid";
import { TbPigMoney } from "react-icons/tb";

export const allUsersTxtFieldsInput = [
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
];

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

export const booksFilters = [filtersCat, filtersSubCat, filtersRating].map(
  (el) => ({
    ...el,
    id: v4(),
    fields: el.fields.map((el) => ({
      ...el,
      id: v4(),
    })),
  })
);

export const booksSorters = addSortFields([
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
]);
