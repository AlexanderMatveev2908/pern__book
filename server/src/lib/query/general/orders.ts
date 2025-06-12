import { literal, Op } from "sequelize";

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
