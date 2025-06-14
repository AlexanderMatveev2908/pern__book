import { literal, Op } from "sequelize";
import { OrderStage, StoreOrderStage } from "../../../types/all/orders.js";

export const handleQtyPriceOrdersQuery = (k: string, v: string, q: any) => {
  switch (k) {
    case "minPrice": {
      q[Op.and as any] = [
        ...(q[Op.and as any] ?? []),
        literal(`SUM("OrderStore"."amount" + "OrderStore"."delivery") >= ${v}`),
      ];

      break;
    }

    case "maxPrice": {
      q[Op.and as any] = [
        ...(q[Op.and as any] ?? []),
        literal(`SUM("OrderStore"."amount" + "OrderStore"."delivery") <= ${v}`),
      ];

      break;
    }

    case "minQty": {
      q[Op.and as any] = [
        ...(q[Op.and as any] ?? []),
        literal(`(
            SELECT SUM(oi.qty)
            FROM "order_items" AS oi
            WHERE oi."orderStoreID" = "OrderStore"."id"
            ) >= ${v}`),
      ];

      break;
    }
    case "maxQty": {
      q[Op.and as any] = [
        ...(q[Op.and as any] ?? []),
        literal(`(
            SELECT SUM(oi.qty)
            FROM "order_items" AS oi
            WHERE oi."orderStoreID" = "OrderStore"."id"
            ) <= ${v}`),
      ];

      break;
    }
  }
};

// ? order is the big, the one that is parent to all suborders of different stores, order store is the order from u will earn money as business man but u do not need to know about others sellers, u do not mind
// ? pending of order or order stage is the same thing, i just like use short alias so mainly is to make readable 🧐
export const hidePendingOrders = (type: "o" | "os") => ({
  stage: {
    [Op.ne]: type === "o" ? OrderStage.PENDING : StoreOrderStage.PENDING,
  },
});
