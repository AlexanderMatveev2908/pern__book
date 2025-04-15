import { DataTypes } from "sequelize";
import seq from "../../../config/db.js";
import { TokenType } from "../Token.js";
import { UserRole, UserType } from "../User.js";
import { TokenEventType } from "../../../types/types.js";

const User = seq.define<UserType>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tempEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.CUSTOMER,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isNewsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

const Token = seq.define<TokenType>(
  "Token",
  {
    type: {
      type: DataTypes.ENUM(...Object.values(TokenEventType)),
      allowNull: false,
    },
    hashed: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    expiry: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { timestamps: true, tableName: "tokens" }
);

const bindModels = () => {
  Token.belongsTo(User, { foreignKey: "userId" });
  User.hasMany(Token, { foreignKey: "userId" });
};

export { User, Token, bindModels };
