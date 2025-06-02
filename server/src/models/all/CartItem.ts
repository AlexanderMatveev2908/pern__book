import { Model } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";

export class CartItem extends Model {}

export const defineCartItem = (seq: any) =>
  CartItem.init(
    {
      ...schemaID(),
      cartID: refSql("carts"),
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "CartItem",
      tableName: "cart_items",
    }
  );
