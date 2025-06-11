import { parseArrFromStr } from "../../../../lib/dataStructures.js";
import { subcategories } from "../../../../types/all/books.js";
import { CatBookStore } from "../../../../types/all/bookStore.js";

export const checkCategories = (k: string, v: string | string[]) => {
  const parsedCat = parseArrFromStr(v as string | string[]);

  if (["mainCategories", "categories"].includes(k)) {
    for (const cat of parsedCat) {
      if (!Object.values(CatBookStore).includes(cat as CatBookStore))
        throw new Error("Invalid category");
    }
  }

  if (k === "subCategories") {
    if (!parsedCat?.length) return;

    const currentSubCats = parseArrFromStr(v as string | string[]);
    const acceptedCat = Object.entries(subcategories)
      .filter(([k]) => parsedCat?.includes(k))
      .flatMap(([_, v]) => v.map((sub) => sub));

    for (const sub of currentSubCats) {
      if (!acceptedCat.includes(sub)) throw new Error("Invalid subcategory");
    }
  }
};
