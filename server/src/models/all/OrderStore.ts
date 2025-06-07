import { Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class OrderStore extends Model {}

export const defineOrderStore = (seq: Sequelize) =>
  OrderStore.init(
    {
      ...schemaID(),

      orderID: refSql("orders"),
      bookStoreID: refSql("book_stores"),
    },
    {
      sequelize: seq,
      timestamps: true,
      modelName: "OrderStore",
      tableName: "order_store",
    }
  );
