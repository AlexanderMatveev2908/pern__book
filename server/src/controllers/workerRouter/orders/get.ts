import { Response } from "express";
import { ReqApp } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";

export const getWorkerOrders = async (req: ReqApp, res: Response) => {
  const { userID } = req;
  const { bookStoreID } = req.params;

  const orders = await OrderStore.findAll({});

  return res200(res, {});
};
