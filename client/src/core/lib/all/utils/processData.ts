import { v4 } from "uuid";
import { captAll } from "./formatters";
import { subcategories } from "@/types/all/books";

export const filterInnerSubCat = (mainCat: string[]) =>
  Object.entries(subcategories)
    .filter(([k]) => mainCat.includes(k))
    // eslint-disable-next-line
    .flatMap(([_, v]) =>
      v.map((sub) => ({
        id: v4(),
        val: sub,
        label: captAll(sub),
      }))
    );
