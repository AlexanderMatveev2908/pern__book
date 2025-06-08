import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaAddress, schemaID } from "./utils/helpers.js";
import { OrderState } from "../../types/all/orders.js";

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
        allowNull: true,
      },

      stage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          enumVals(val: string) {
            if (!Object.values(OrderState).includes(val as OrderState))
              throw new Error("Invalid state");
            return true;
          },
        },
      },

      ...schemaAddress({ allowNull: false }),

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
