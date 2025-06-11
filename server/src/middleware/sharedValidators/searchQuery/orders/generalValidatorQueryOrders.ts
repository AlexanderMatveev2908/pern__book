import { check } from "express-validator";
import { CatBookStore } from "../../../../types/all/bookStore.js";
import { checkDelivery, checkPrices, checkQty } from "../general/db.js";
import { checkPagination } from "../general/pagination.js";

export const generalValidatorQueryOrders = [
  ...checkPagination,

  check().custom((_, { req }) => {
    const q = req?.query ?? {};

    const currentMainCat = (
      Array.isArray(q?.mainCategories) ? q?.mainCategories : [q?.mainCategories]
    ).filter((el) => !!el);

    for (const k in q) {
      const v = q[k];

      if (k === "categories") {
        for (const cat of currentMainCat) {
          if (!Object.values(CatBookStore).includes(cat as CatBookStore))
            throw new Error("Invalid category");
        }
      }

      checkDelivery(k, v);
      checkPrices(k, v);
      checkQty(k, v);
    }
  }),
];
