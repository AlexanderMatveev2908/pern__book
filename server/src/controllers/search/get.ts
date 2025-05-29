import { Response } from "express";
import { ReqApp } from "../../types/types.js";
import { Book } from "../../models/all/Book.js";
import { literal } from "sequelize";
import { res200, res204 } from "../../lib/responseClient/res.js";

export const getBooksByBestReviews = async (req: ReqApp, res: Response) => {
  const books = await Book.findAll({
    where: {},
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
  });

  if (!books.length) return res204(res);

  return res200(res, { books });
};
