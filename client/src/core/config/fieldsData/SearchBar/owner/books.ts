import { captAll } from "@/core/lib/lib";
import { categoriesBooks } from "@/types/all/books";
import { FilterSearch, NumericFilterSearch } from "@/types/types";
import { FaDatabase, FaRegStar } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { v4 } from "uuid";
import { TbPigMoney } from "react-icons/tb";
import { LuAlarmClock } from "react-icons/lu";
import { CatBookStore } from "@/types/all/bookStore";
import { addSortFields, ratingRanges } from "../general";

export const fieldsInputsBooks = [
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

const priceFilters: Omit<NumericFilterSearch, "id"> = {
  label: "Price",
  field: "price",
  icon: TbPigMoney,
  fields: [
    {
      label: "Min price",
      field: "minPrice",
    },
    {
      label: "Max price",
      field: "maxPrice",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

const qtyFilters: Omit<NumericFilterSearch, "id"> = {
  label: "Quantity",
  icon: FaDatabase,
  field: "qty",
  fields: [
    {
      field: "minQty",
      label: "Min quantity",
    },
    {
      field: "maxQty",
      label: "Max quantity",
    },
  ].map((el) => ({
    ...el,
    place: el.label + "...",
  })),
};

export const ownerBooksNumericFilters = [priceFilters, qtyFilters].map(
  (el) => ({
    ...el,
    id: v4(),
    fields: el.fields.map((el) => ({
      ...el,
      id: v4(),
    })),
  })
);

export const ownerBooksSorters = [
  {
    label: "Created at",
    field: "createdAtSort",
    icon: LuAlarmClock,
  },
  {
    label: "Updated at",
    field: "updatedAtSort",
    icon: LuAlarmClock,
  },
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
].map((el) => ({
  ...el,
  id: v4(),
  fields: addSortFields(),
}));
