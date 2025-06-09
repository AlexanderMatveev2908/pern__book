import { DataTypes, Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";
import { BookInstance } from "./Book.js";
import { CloudImg } from "../../types/all/cloud.js";

export class OrderItemStore extends Model {
  id!: string;
  orderStoreID!: string;
  bookID!: string;
  title!: string;
  qty!: number;
  price!: number;
  images?: CloudImg[] | null;

  book?: BookInstance;
}

export type OrderItemStoreInstance = InstanceType<typeof OrderItemStore>;

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
      modelName: "OrderItemStore",
      tableName: "order_items",
      paranoid: true,
    }
  );
