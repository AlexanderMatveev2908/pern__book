import { defineToken } from "../Token.js";
import { defineUser } from "../User.js";
import { definePairRSA } from "../Key.js";
export const bindModels = (seq) => {
  const User = defineUser(seq);
  const Token = defineToken(seq);
  definePairRSA(seq);
  Token.belongsTo(User, { foreignKey: "userID", onDelete: "CASCADE" });
  User.hasMany(Token, { foreignKey: "userID", onDelete: "CASCADE" });
};
