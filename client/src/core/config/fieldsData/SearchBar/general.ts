import { capt } from "@/core/lib/lib";
import { CatBookStore } from "@/types/all/bookStore";
import { FiltersSearch } from "@/types/types";
import { MdOutlineCategory } from "react-icons/md";
import { v4 } from "uuid";

export const filtersCat: FiltersSearch = {
  label: "Categories",
  icon: MdOutlineCategory,
  fields: Object.values(CatBookStore).map((el) => ({
    field: el,
    label: capt(el),
    id: v4(),
  })),
};
