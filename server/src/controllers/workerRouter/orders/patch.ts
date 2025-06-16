import { Response } from "express";
import { ReqApp, UserRole } from "../../../types/types.js";
import { res200 } from "../../../lib/responseClient/res.js";
import { OrderStore } from "../../../models/all/OrderStore.js";
import { Order } from "../../../models/all/Order.js";
import { hidePendingOrders } from "../../../lib/query/general/orders.js";
import { BookStore } from "../../../models/all/BookStore.js";
import { User } from "../../../models/all/User.js";
import {
  err403,
  err404,
  err409,
  err500,
} from "../../../lib/responseClient/err.js";
import {
  allowedDeletePatchStore,
  OrderStage,
  stagesArgCalcPatch,
  stagesOrderFlowFinished,
  StoreOrderStage,
} from "../../../types/all/orders.js";
import { seq } from "../../../config/db.js";
import { __cg } from "../../../lib/utils/log.js";
import { Op } from "sequelize";

export const patchOrderWorker = async (req: ReqApp, res: Response) => {
  const {
    userID,
    params: { orderID },
    body: { stage },
  } = req;

  const order = await OrderStore.findOne({
    where: {
      id: orderID,
    },
    include: [
      {
        model: Order,
        as: "order",
        required: true,
        where: hidePendingOrders("o"),
        include: [
          {
            model: OrderStore,
            as: "orderStores",
            where: {
              id: orderID,
            },
          },
        ],
      },
      {
        model: BookStore,
        as: "store",
        required: true,
        include: [
          {
            model: User,
            as: "team",
            required: true,
            where: { id: userID },
            through: {
              as: "bookStoreUser",
            },
          },
        ],
      },
    ],
  });

  if (!order) return err404(res, { msg: "Order not found" });

  if (allowedDeletePatchStore.includes(order.stage as StoreOrderStage))
    return err409(res, { msg: "Order state can no more be updated" });

  const oldIndex = stagesArgCalcPatch.findIndex((st) => st === order.stage);
  const newIndex = stagesArgCalcPatch.findIndex((st) => st === stage);
  if (newIndex <= oldIndex)
    return err409(res, {
      msg: "Is not allowed to go back in stage order flow",
    });

  const [{ bookStoreUser: { role } = {} } = {}] =
    order!.store!.team ?? ([] as any);

  if (
    ![UserRole.OWNER, UserRole.MANAGER].includes(role as UserRole) &&
    order.stage === StoreOrderStage.COMPLETED
  )
    return err403(res, { msg: "User not allowed" });

  const t = await seq.transaction();

  try {
    await OrderStore.update(
      {
        stage,
      },
      {
        where: {
          id: orderID,
        },
        transaction: t,
      }
    );

    if (stage === OrderStage.COMPLETED) {
      let canCanMarkUserOrderDone = true;

      for (const os of order!.order!.orderStores!) {
        if (os.id === orderID) continue;
        if (!stagesOrderFlowFinished.includes(os.stage as StoreOrderStage)) {
          canCanMarkUserOrderDone = false;
          break;
        }
      }

      if (canCanMarkUserOrderDone)
        await Order.update(
          {
            stage: OrderStage.COMPLETED,
          },
          {
            where: {
              id: order!.order!.id,
            },
            transaction: t,
          }
        );
    }

    await t.commit();

    return res200(res, { msg: "order stage updated" });
  } catch (err) {
    __cg("err", err);

    await t.rollback();

    return err500(res);
  }
};
