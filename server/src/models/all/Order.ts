import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class Order extends Model {
  id!: CreationOptional<string>;
  paymentID!: string;
  clientSecret!: string;
  discount!: number;
}

export type OrderInstance = InstanceType<typeof Order>;

export const defineOrder = (seq: Sequelize) =>
  Order.init(
    {
      ...schemaID(),
      userID: refSql("users", { allowNull: true }),

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
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "Order",
      tableName: "orders",
      paranoid: true,
    }
  );
