import { REG_ID } from "@/core/config/regex";
import {
  commonHandleRefineBooks,
  generalFieldsSearchBooksSchema,
  generalOptSearchBookItem,
  handleYearRefine,
} from "../general/books";
import { itemsSchema } from "../general/general";
import { z } from "zod";

// ? ACTUALLY RIGHT NOW IS JUST SAME IDENTICAL SCHEMA OF OWNER BUT COULD CHANGE AND I WNA T TO BE PREPARED FOR THAT SO WILL BE MORE SCALABLE

const allowedKeys = ["ID", "title", "author", "year"];

const optItem = {
  ID: {
    reg: REG_ID,
    minLen: 0,
    maxLen: 36,
  },
  ...generalOptSearchBookItem,
};

const itemSchema = itemsSchema({
  allowedKeys,
  optItem,
  customValidateCB: handleYearRefine,
});

export const searchBooksWorkerSchema = generalFieldsSearchBooksSchema
  .extend({
    items: z.array(itemSchema).optional(),
  })
  .superRefine((data, ctx) => {
    commonHandleRefineBooks({ data, ctx });
  });
