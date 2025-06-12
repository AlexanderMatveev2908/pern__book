import { Response } from "express";
import { BookStore } from "../../../models/all/BookStore.js";
import { err404, err500 } from "../../../lib/responseClient/err.js";
import { res200, res204 } from "../../../lib/responseClient/res.js";
import { ReqApp } from "../../../types/types.js";
import { Book } from "../../../models/all/Book.js";
import { Review } from "../../../models/all/Review.js";
import { literal, OrderItem } from "sequelize";
import { __cg } from "../../../lib/utils/log.js";
import PDFDocument from "pdfkit";
import { makeBooksQ } from "../../../lib/query/owner/books/query.js";
import { calcRatingSqlBooks } from "../../../lib/query/general/books.js";
import { sortAndPaginate } from "../../../lib/query/general/sortAndPaginate.js";
import { extractNoHits, extractOffset } from "../../../lib/utils/formatters.js";
import { sortByTimeStamps } from "../../../lib/query/general/sort.js";

export const getStoreInfo = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    attributes: ["id", "name", "categories"],
  });

  if (!stores.length) return err404(res, { msg: "user does not have stores" });

  return res200(res, { stores });
};

export const getInfoBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    include: [
      {
        model: Book,
        as: "books",
        where: {},
        required: true,
      },
    ],
    nest: true,
  });

  const objs = stores.map((el) => el.toJSON());

  if (!objs.length) return err404(res, { msg: "user does not have stores" });
  if (!objs?.[0]?.books?.length) return err404(res, { msg: "book not found" });

  return res200(res, { book: objs[0].books[0] });
};

export const getMyBook = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;
  const { bookID } = req.params;

  const book = await Book.findOne({
    where: {
      id: bookID,
    },
    include: [
      {
        model: BookStore,
        as: "store",
        required: true,
        where: { ownerID: userID },
      },
      {
        model: Review,
        as: "reviews",
      },
    ],
    attributes: {
      include: [
        [literal(`"store"."categories"`), "mainCategories"],
        ...calcRatingSqlBooks(),
      ],
    },
    group: ["Book.id", "store.id", "reviews.id"],
  });

  if (!book) return err404(res, { msg: "book not found" });

  return res200(res, { book });
};

export const getBooksList = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { queryBooks, queryStores, queryAfterPipe } = makeBooksQ(req);

  const { rows: books, count } = await Book.findAndCountAll({
    where: queryBooks,
    include: [
      {
        model: BookStore,
        as: "store",
        where: queryStores,
        attributes: ["id", "name", "categories"],
        required: true,
      },
      {
        model: Review,
        as: "reviews",
        separate: true,
      },
    ],
    group: ["Book.id", "store.id"],
    attributes: {
      include: [
        [literal(`"store"."categories"`), "mainCategories"],

        ...calcRatingSqlBooks(),
      ],
    },
    having: queryAfterPipe,

    order: [
      ...sortByTimeStamps(req),

      ...((req.query?.avgRatingSort
        ? [
            [
              literal(`(
          SELECT ROUND(COALESCE(AVG(r.rating), 0.0), 1)
          FROM "reviews" AS r
          WHERE r."bookID" = "Book".id
          AND r."deletedAt" IS NULL
          )`),
              req.query.avgRatingSort,
            ],
          ]
        : []) as OrderItem[]),

      ...((req.query?.priceSort
        ? [["qty", req.query.priceSort]]
        : []) as OrderItem[]),

      ...((req.query?.qtySort
        ? [["qty", req.query.qtySort]]
        : []) as OrderItem[]),
    ],

    ...extractOffset(req),
  });

  const { nHits, totPages } = extractNoHits(req, count);

  return res200(res, { books, nHits, totPages });
};

export const getPdf = async (req: ReqApp, res: Response): Promise<any> => {
  const { userID } = req;

  const stores = await BookStore.findAll({
    where: {
      ownerID: userID,
    },
    include: [
      {
        model: Book,
        as: "books",
      },
    ],
  });

  if (!stores.length) return res204(res);

  const doc = new PDFDocument({
    autoFirstPage: true,
  });

  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="books.pdf"`);
    doc.pipe(res);

    doc.fontSize(24).text("List of books", { align: "center" });

    doc.moveDown(1.25);

    for (const s of stores) {
      if (!s?.books?.length) continue;

      doc.fontSize(18).text(s.name, { align: "center" });

      doc.moveDown(0.5);

      for (const b of s.books) {
        doc.fontSize(14).text(`${b.title} -- ${b.author} -- ${b.year}`, {
          align: "center",
        });
      }

      doc.moveDown(1);
    }

    doc.end();
  } catch (err) {
    __cg("err pdf", err);

    return err500(res);
  }
};
