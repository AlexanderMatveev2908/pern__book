import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { Book } from "../../models/all/Book.js";
import { literal, Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";

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
          literal(`(
      SELECT COALESCE(AVG(r.rating), 0)
      FROM "reviews" AS r
      WHERE r."bookID" = "Book".id
    )`),
          "avgRating",
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
