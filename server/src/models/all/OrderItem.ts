import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class OrderItemStore extends Model {}

export const defineOrderItemStore = (seq: Sequelize) =>
  OrderItemStore.init(
    {
      ...schemaID(),
      orderStoreID: refSql("orders_stores"),
      bookID: refSql("books", { allowNull: true }),
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      sequelize: seq,
      timestamps: true,
      modelName: "OrderItem",
      tableName: "order_items",
      paranoid: true,
    }
  );
