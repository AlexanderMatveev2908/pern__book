import seq from "../../../config/db.js";
import { defineToken } from "../Token.js";
import { defineUser } from "../User.js";
const User = defineUser(seq);
const Token = defineToken(seq);
const bindModels = () => {
    Token.belongsTo(User, { foreignKey: "userId" });
    User.hasMany(Token, { foreignKey: "userId" });
};
export { bindModels, Token, User };
