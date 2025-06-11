import { WhereOptions } from "sequelize";
import { ReqApp } from "../../../../types/types.js";

export const makeQueryOrdersOwner = (req: ReqApp) => {
  const { userID } = req;
  const q = req.query ?? {};

  const queryOrders: WhereOptions = {};
};
