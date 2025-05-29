import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { Book } from "../../models/all/Book.js";
import { literal, Op } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";

export const getBooksByBestReviews = async (req: ReqApp, res: Response) => {
  const booksByRating = await Book.findAll({
    where: {
      [Op.and]: [
        { images: { [Op.ne]: null } },
        literal("jsonb_array_length(images) > 0"),
      ],
    },
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
    where: {
      [Op.and]: [
        { images: { [Op.ne]: null } },
        literal("jsonb_array_length(images) > 0"),
      ],
    },
    offset: 0,
    limit: 10,
    order: [["createdAt", "DESC"]],
  });

  return res200(res, { booksByRating, booksRecent });
};
