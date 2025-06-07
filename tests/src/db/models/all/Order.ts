import { DataTypes, Model, Sequelize } from "sequelize";
import { schemaID } from "./helpers.js";

export class Order extends Model {}

export type OrderInstance = InstanceType<typeof Order>;

export const defineOrder = (seq: Sequelize) =>
  Order.init(
    {
      ...schemaID(),
      paymentID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "Order",
      tableName: "orders",
    }
  );
