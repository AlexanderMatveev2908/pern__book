import { literal, Op, WhereOptions } from "sequelize";
import { findVal } from "../../utils/formatters.js";
import { Literal } from "sequelize/lib/utils";
import { StoreOrderStage } from "../../../types/all/orders.js";

export const handleQueryDelivery = ({
  val,
  query,
  key,
}: {
  val: string | string[];
  query: WhereOptions;
  key: string;
}) => {
  const deliveryConditions: WhereOptions = [];

  if (findVal(val, "free_delivery"))
    deliveryConditions.push({
      [key]: {
        [Op.lte]: 0,
      },
    });

  if (findVal(val, "delivery_charged"))
    deliveryConditions.push({
      [key]: {
        [Op.gt]: 0,
      },
    });

  if (deliveryConditions.length)
    (query as any)[Op.or as any] = [
      ...((query as any)[Op.or as any] ?? []),
      ...deliveryConditions,
    ];
};

export const countOrdersSql = (stage: StoreOrderStage): Literal =>
  literal(`(SELECT COALESCE(COUNT(DISTINCT o."id"), 0)
    FROM "orders_stores" AS o
    WHERE o."stage" = '${stage}'
    AND o."bookStoreID" = "BookStore"."id"
    AND o."deletedAt" IS NULL
    )`);
