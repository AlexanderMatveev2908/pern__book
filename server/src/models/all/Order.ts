import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class Order extends Model {
  id!: CreationOptional<string>;
  paymentID!: string;
  clientSecret!: string;
  items!: any;
  totQty!: number;
  amount!: number;
  delivery!: number;
  discount!: number;
  stage!: string;
}

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
      items: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      images: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      totQty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      // ? U COULD JUST SET ALLOW_NULL_FALSE, I PREFER KEEP NULL CAUSE I LIKE WORK WITH IT
      delivery: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      stage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "pending",
      },

      bookStoreID: refSql("book_stores"),
      userID: refSql("users"),
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "Order",
      tableName: "orders",
    }
  );
