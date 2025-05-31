import { WhereOptions } from "sequelize";
import { ReqApp } from "../../../types/types.js";

export const makeQueryBooksConsumer = (req: ReqApp) => {
  const queryBooks: WhereOptions = {};

  for (const k in req.query) {
    const v = req.query[k];
  }

  return { queryBooks };
};
