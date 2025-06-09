import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaAddress, schemaID } from "./utils/helpers.js";
import { OrderState } from "../../types/all/orders.js";
import { OrderStoreInstance } from "./OrderStore.js";

export class Order extends Model {
  id!: CreationOptional<string>;
  paymentID!: string;
  discount!: number;
  totAmount!: number;
  stage!: OrderState;
  userID?: string;

  county?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCod?: string;
  phone?: string;

  orderStores?: OrderStoreInstance[];
}

export type OrderInstance = InstanceType<typeof Order>;

export const defineOrder = (seq: Sequelize) =>
  Order.init(
    {
      ...schemaID(),
      userID: refSql("users", { allowNull: true }),

      ...schemaAddress({ allowNull: true }),

      paymentID: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      stage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },

      totAmount: {
        type: DataTypes.DECIMAL(10, 2),
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
