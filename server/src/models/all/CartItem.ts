import { DataTypes, Model } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";
import { BookInstance } from "./Book.js";

export class CartItem extends Model {
  id!: string;
  cartID!: string;
  bookID!: string;
  qty!: number;

  book?: BookInstance;
}

export type CartItemInstance = InstanceType<typeof CartItem>;

export const defineCartItem = (seq: any) =>
  CartItem.init(
    {
      ...schemaID(),
      cartID: refSql("carts"),
      bookID: refSql("books", { allowNull: true }),
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "CartItem",
      tableName: "cart_items",
    }
  );
