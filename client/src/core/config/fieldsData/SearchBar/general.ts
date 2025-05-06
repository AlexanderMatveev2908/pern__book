import { CatBookStore } from "@/types/all/bookStore";
import { v4 } from "uuid";

export const catFilters = Object.values(CatBookStore).map((el) => ({
  id: v4(),
}));
