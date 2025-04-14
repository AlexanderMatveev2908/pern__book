import Token from "../Token.js";
import User from "../User.js";

export const bindModels = () => {
  Token.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Token, { foreignKey: "userId" });
};
