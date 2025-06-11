import { check } from "express-validator";
import { checkPagination } from "../general/pagination.js";
import { allOrNothingStr } from "../../../../lib/dataStructures.js";
import { REG_BOOK_TITLE, REG_INT, REG_NAME } from "../../../../config/regex.js";
import { CatBookStore } from "../../../../types/all/bookStore.js";
import { subcategories } from "../../../../types/all/books.js";
import { checkPrices, checkQty } from "../general/db.js";

export const generalValidationSearchBooks = [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};
    const params = Object.entries(q);

    const currentMainCat = (
      Array.isArray(q?.mainCategories) ? q?.mainCategories : [q?.mainCategories]
    ).filter((el) => !!el);

    for (const pair of params) {
      const k = pair[0];
      const v = pair[1];

      checkPrices(k, v);

      if (
        k === "year" &&
        (!allOrNothingStr(REG_INT, v) ||
          +(v ?? "") < 1450 ||
          +(v ?? "") > new Date().getFullYear())
      )
        throw new Error("Invalid year");
      if (k === "title" && !allOrNothingStr(REG_BOOK_TITLE, v))
        throw new Error("Invalid title");
      if (k === "author" && !allOrNothingStr(REG_NAME, v))
        throw new Error("Invalid author");
      if (k === "mainCategories") {
        for (const cat of currentMainCat) {
          if (!Object.values(CatBookStore).includes(cat as CatBookStore))
            throw new Error("Invalid category");
        }
      }
      if (k === "subCategories") {
        if (!currentMainCat?.length) continue;
        const currentSubCats = (Array.isArray(v) ? v : [v]).filter(
          (el) => !!el
        );
        const acceptedCat = Object.entries(subcategories)
          .filter(([k]) => currentMainCat?.includes(k))
          .flatMap(([_, v]) => v.map((sub) => sub));
        for (const sub of currentSubCats) {
          if (!acceptedCat.includes(sub))
            throw new Error("Invalid subcategory");
        }
      }
    }

    return true;
  }),
];

export const generalValidatorSearchBooksBusiness = [
  check().custom((_, { req }) => {
    const q = req?.query ?? {};
    const params = Object.entries(q);

    for (const pair of params) {
      const k = pair[0];
      const v = pair[1];

      checkQty(k, v);
    }

    return true;
  }),
];
