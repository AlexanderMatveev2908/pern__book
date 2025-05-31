import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { Book } from "../../models/all/Book.js";
import { literal, Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";
import { sortItems } from "../../lib/query/sort.js";
import { calcPagination } from "../../lib/query/pagination.js";
import { makeQueryBooksConsumer } from "../../lib/query/consumer/books.js";
import { calcRatingSqlBooks } from "../../lib/query/general.js";

const withImages = {
  [Op.and]: [
    { images: { [Op.ne]: null } },
    literal("jsonb_array_length(images) > 0"),
  ],
};

export const getBooksByBestReviews = async (req: ReqApp, res: Response) => {
  const booksByRating = await Book.findAll({
    where: withImages,
    attributes: {
      include: [
        [
          literal(`json_build_object(
    'avgRating',(
      SELECT TO_CHAR(ROUND(COALESCE(AVG(r.rating), 0), 1), 'FM0.0')
      FROM "reviews" AS r
      WHERE r."bookID" = "Book".id
          )
    )`),
          "ratingStats",
        ],
      ],
    },
    offset: 0,
    limit: 10,
    order: [
      [
        literal(`(
      SELECT COALESCE(AVG(r.rating), 0)
      FROM "reviews" AS r
      WHERE r."bookID" = "Book".id
    )`),
        "DESC",
      ],
    ],
  });

  const booksRecent = await Book.findAll({
    where: withImages,
    attributes: {
      include: [
        [
          literal(`
  json_build_object(
    'isEven', (qty % 2 = 0),
    'qty', qty,
    'deepNest', json_build_object(
      'store', (
        SELECT json_build_object(
          'images', (
          SELECT json_agg(i.url)
          FROM "images_book_stores" AS i
          WHERE i."bookStoreID" = "Book"."bookStoreID"
          )
        )
      )
    )
  )
            `),
          "customField",
        ],
      ],
    },
    offset: 0,
    limit: 10,
    order: [["createdAt", "DESC"]],
  });

  const booksByPrice = await Book.findAll({
    where: withImages,

    offset: 0,
    limit: 10,
    order: [["price", "ASC"]],
  });

  return res200(res, { books: { booksByRating, booksRecent, booksByPrice } });
};

export const getAllBooksConsumer = async (req: ReqApp, res: Response) => {
  const { queryBooks } = makeQueryBooksConsumer(req);

  const books = await Book.findAll({
    where: {},
    attributes: {
      include: [...calcRatingSqlBooks()],
    },
  });

  const nHits = books.length;
  if (!nHits) return res204(res);

  const { sorted } = sortItems(req, books);
  const { totPages, paginated } = calcPagination({ req, nHits, els: sorted });

  return res200(res, { totPages, nHits, books: paginated });
};
