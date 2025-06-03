import { Model, Sequelize } from "sequelize";
import { refSql, schemaID } from "./utils/helpers.js";
import { CartItemInstance } from "./CartItem.js";

export class Cart extends Model {
  id!: string;
  userID!: string;
  items?: CartItemInstance[];
}

export type CartInstance = InstanceType<typeof Cart>;

export const defineCart = (seq: Sequelize) =>
  Cart.init(
    {
      ...schemaID(),
      userID: refSql("users"),
    },
    {
      timestamps: true,
      sequelize: seq,
      modelName: "Cart",
      tableName: "carts",
    }
  );
