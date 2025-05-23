import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/models.js";
import { err404 } from "../../../lib/responseClient/err.js";
import { res200 } from "../../../lib/responseClient/res.js";

export const getInfoStore = async (
  req: ReqApp,
  res: Response
): Promise<any> => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const store = await BookStore.findOne({
    where: {
      id: bookStoreID,
    },
    attributes: ["categories"],
    include: [
      {
        model: User,
        as: "team",
        attributes: ["id"],
        required: true,
        through: {
          attributes: ["id"],
          where: {
            userID,
            role: UserRole.MANAGER,
          },
        },
      },
    ],
  });

  if (!store) return err404(res, { msg: "store not found" });

  return res200(res, { bookStore: store });
};
