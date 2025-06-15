import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";
import { OrderItemStoreInstance } from "./OrderItemStore.js";
import { BookStoreInstance } from "./BookStore.js";
import { OrderInstance } from "./Order.js";

export class OrderStore extends Model {
  id!: string;
  orderID!: string;
  bookStoreID!: string;
  amount!: number;
  delivery!: number;
  expectedArrival!: number;
  stage!: string;

  bookStoreName!: string;

  order?: OrderInstance;

  orderItemStores?: OrderItemStoreInstance[];
  store?: BookStoreInstance;
}

export type OrderStoreInstance = InstanceType<typeof OrderStore>;

export const defineOrderStore = (seq: Sequelize) =>
  OrderStore.init(
    {
      ...schemaID(),

      orderID: refSql("orders"),
      bookStoreID: refSql("book_stores", { allowNull: true }),

      bookStoreName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

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
