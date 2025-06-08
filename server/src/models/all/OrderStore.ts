import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class OrderStore extends Model {}

export const defineOrderStore = (seq: Sequelize) =>
  OrderStore.init(
    {
      ...schemaID(),

      orderID: refSql("orders"),
      bookStoreID: refSql("book_stores"),

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      delivery: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      expectedArrival: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      modelName: "OrderStore",
      tableName: "orders_stores",
      paranoid: true,
    }
  );
