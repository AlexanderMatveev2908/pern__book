import { Sequelize } from "sequelize";
import { defineToken } from "../Token.js";
import { defineUser } from "../User.js";
import { definePairRSA } from "../KeyRSA.js";
import { defineKeyCbcHmac } from "../KeyCbcHmac.js";

export const bindModels = (seq: Sequelize) => {
  const User = defineUser(seq);
  const Token = defineToken(seq);

  definePairRSA(seq);
  defineKeyCbcHmac(seq);

  Token.belongsTo(User, { foreignKey: "userID", onDelete: "CASCADE" });
  User.hasMany(Token, { foreignKey: "userID", onDelete: "CASCADE" });
};
