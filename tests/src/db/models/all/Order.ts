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

      bookStoreID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "book_stores",
          key: "id",
        },
      },
      userID: {
        type: DataTypes.STRING(36),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "Order",
      tableName: "orders",
    }
  );
