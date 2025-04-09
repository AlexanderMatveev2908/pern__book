import User from "./User.js";
import Product from "./Product.js";

export const makeRelations = () => {
  Product.belongsTo(User);
  User.hasMany(Product, { foreignKey: "userId" });
};
